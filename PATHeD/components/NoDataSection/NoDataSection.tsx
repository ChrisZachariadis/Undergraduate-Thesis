import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {t} from 'i18next';
import globalStyle from '../../assets/styles/globalStyle';

const NoDataComponent = () => (
  <View style={styles.noDataContainer}>
    <Text style={globalStyle.descriptionBlackL2}>{t('general.no-known')}</Text>
  </View>
);

export default NoDataComponent;
