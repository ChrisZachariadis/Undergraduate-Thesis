import React from 'react';
import styles from './styles';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {Switch, Text, View} from 'react-native';

// Remove check and put toggle and remove backround color, also put toggle on right
const ResourceIPS = props => {
  const {t} = useTranslation();

  const renderText = (text: string) =>
    !props.phase && text !== t('no-data') && <Text>{text}</Text>;

  const handleToggle = () => {
    if (props.selected) {
      props.removeID(props.id);
    } else {
      props.addID(props.id);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.resourceContainer}>
          <Text style={styles.typeText}>{props.type}</Text>
          <Text>{props.text1}</Text>
          {renderText(props.text2)}
          {renderText(props.text3)}
          {renderText(props.text4)}
        </View>
        <View style={styles.checkBoxContainer}>
          <Switch value={props.selected} onValueChange={handleToggle} />
        </View>
      </View>
    </View>
  );
};

ResourceIPS.propTypes = {
  id: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  addID: PropTypes.func,
  removeID: PropTypes.func,
  type: PropTypes.string.isRequired,
  text1: PropTypes.string.isRequired,
  text2: PropTypes.string,
  text3: PropTypes.string,
  text4: PropTypes.string,
  phase: PropTypes.bool,
};

export default ResourceIPS;
