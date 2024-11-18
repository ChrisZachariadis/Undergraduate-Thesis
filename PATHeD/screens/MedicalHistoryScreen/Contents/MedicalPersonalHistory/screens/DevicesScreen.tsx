import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import globalStyle from '../../../../../assets/styles/globalStyle';
import DeviceAndImplants from '../DevicesAndImplants';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {verticalScale} from '../../../../../assets/styles/scaling';

const DevicesScreen = () => {
  const {t} = useTranslation();
  const DevicesTabs = createMaterialTopTabNavigator();

  return (
    <SafeAreaView>
      <View>
        <View style={globalStyle.marginTop60}>
          <View style={styles.container}>
            <DevicesTabs.Navigator
              screenOptions={{
                tabBarLabelStyle: [
                  globalStyle.descriptionGrey,
                  {textTransform: 'none'},
                ],
                tabBarStyle: {backgroundColor: '#f2f2f2'},
                tabBarIndicatorStyle: {backgroundColor: 'transparent'},
                tabBarItemStyle: {width: verticalScale(200)},
              }}>
              <DevicesTabs.Screen
                name={t('patientSummary.devices.title')}
                component={DeviceAndImplants}
              />
            </DevicesTabs.Navigator>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DevicesScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
