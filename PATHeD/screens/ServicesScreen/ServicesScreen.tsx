import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import NavigationButton from '../../components/NavigationButton/NavigationButton';
import styles from './style';
import globalStyle from '../../assets/styles/globalStyle';
import {useTranslation} from 'react-i18next';

// @ts-ignore
const ServicesScreen = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <View />
      <ScrollView style={globalStyle.marginTop60}>
        <NavigationButton
          type={'withIcon'}
          title={t('services.doctor-registry.title')}
          image={require('../../assets/images/forNavigation/Doctor_registry.png')}
          onPress={() => {
            navigation.navigate('Alerts'); // TO BE IMPLEMENTED
          }}
          bottomBorderStyle={globalStyle.bottomBorderL3}
          titleStyle={globalStyle.descriptionBlackL1}
        />
        <NavigationButton
          type={'withIcon'}
          title={t('services.pharmacist-registry.title')}
          image={require('../../assets/images/forNavigation/Pharmacist_registry.png')}
          onPress={() => {
            navigation.navigate('Alerts'); // TO BE IMPLEMENTED
          }}
          titleStyle={globalStyle.descriptionBlackL1}
        />

        <NavigationButton
          type={'withIcon'}
          title={t('services.smartwatch-registry.title')}
          image={require('../../assets/images/forNavigation/watch_data.png')}
          onPress={() => {
            navigation.navigate('Alerts'); // TO BE IMPLEMENTED
          }}
          titleStyle={globalStyle.descriptionBlackL1}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServicesScreen;
