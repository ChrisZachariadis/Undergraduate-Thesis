import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';
import CountryFlag from 'react-native-country-flag';

const NavigationButton = props => {
  return (
    <View>
      <Pressable onPress={props.onPress}>
        <View style={[styles.container, props.bottomBorderStyle]}>
          {props.type === 'withIcon' && props.countryIso && (
            <CountryFlag isoCode={props.countryIso} size={25} />
          )}
          {props.type === 'withIcon' && props.image && (
            <Image style={styles.icon_image} source={props.image} />
          )}
          <Text
            style={[
              props.titleStyle,
              props.title === 'Logout' || props.title === 'Αποσύνδεση'
                ? styles.red_title
                : styles.title,
            ]}>
            {props.title}
          </Text>
          {props.type === 'withArrow' && (
            <View style={styles.arrow_container}>
              <Image
                style={styles.arrow_image}
                source={require('../../assets/images/forNavigation/Arrow.png')}
              />
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
};

NavigationButton.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.any,
  countryIso: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  bottomBorderStyle: PropTypes.any,
  titleStyle: PropTypes.any,
};

export default NavigationButton;
