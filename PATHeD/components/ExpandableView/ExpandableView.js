import React, {useEffect, useState} from 'react';
import {Animated, Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import globalStyle from '../../assets/styles/globalStyle';
import PropTypes from 'prop-types';
import {verticalScale} from '../../assets/styles/scaling';

const ExpandableContainer = ({expanded, no_items, expandLevel, children}) => {
  const [height] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(height, {
      toValue: !expanded ? no_items * 94 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [expanded, height, no_items]);

  return (
    <Animated.View
      style={[
        expandLevel === 1
          ? {
              backgroundColor: '#e8e8ea',
            }
          : expandLevel === 2
          ? {
              backgroundColor: '#d9d9da',
            }
          : {},
      ]}>
      {!expanded && ( // Conditional rendering
        <>{children}</>
      )}
    </Animated.View>
  );
};

const ExpandableView = props => {
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setIsExpanded(!isExpanded);
        }}
        style={[
          styles.toggle,
          props.expandLevel === 1
            ? {
                backgroundColor: '#e8e8ea',
                height: verticalScale(42),
              }
            : props.expandLevel === 2
            ? {
                backgroundColor: '#d9d9da',
                height: verticalScale(42),
              }
            : {},
        ]}>
        {props.expandLevel === 0 && (
          <Text style={[globalStyle.descriptionBlackL1, styles.toggleText]}>
            {props.title}
          </Text>
        )}
        {props.expandLevel === 1 && (
          <Text style={[globalStyle.descriptionBlackL2, styles.toggleText]}>
            {props.title}
          </Text>
        )}
        {props.expandLevel === 2 && (
          <Text style={[globalStyle.descriptionBlackL3, styles.toggleText]}>
            {props.title}
          </Text>
        )}
      </TouchableOpacity>
      <View style={styles.arrow_container}>
        <Image
          style={[
            styles.arrow_image,
            {
              transform: [{rotate: isExpanded ? '90deg' : '-90deg'}],
            },
          ]}
          source={require('../../assets/images/forNavigation/Arrow.png')}
        />
      </View>
      <ExpandableContainer
        expanded={isExpanded}
        no_items={2}
        expandLevel={props.expandLevel}>
        {props.children}
      </ExpandableContainer>
    </View>
  );
};

ExpandableView.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any,
  expandLevel: PropTypes.number,
};

export default ExpandableView;
