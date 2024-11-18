import React from 'react';
import {Text, View} from 'react-native';
import styles from './style';
import PropTypes from 'prop-types';
import globalStyle from '../../assets/styles/globalStyle';

const Modalinfo = props => {
  return (
    <View style={styles.container}>
      <Text style={globalStyle.descriptionGrey}>{props.placeholder}</Text>
      <Text style={globalStyle.descriptionBlackL1}>{props.value}</Text>
    </View>
  );
};

Modalinfo.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Modalinfo;
