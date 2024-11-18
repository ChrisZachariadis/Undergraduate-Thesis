import React from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';
import globalStyle from '../../assets/styles/globalStyle';

const Subtitle = props => {
  return (
    <View style={globalStyle.subtitleBox}>
      <Text style={globalStyle.descriptionGrey}>{props.title}</Text>
    </View>
  );
};

Subtitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Subtitle;
