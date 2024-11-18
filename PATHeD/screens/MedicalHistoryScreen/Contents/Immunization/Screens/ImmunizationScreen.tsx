import globalStyle from '../../../../../assets/styles/globalStyle';
import {verticalScale} from '../../../../../assets/styles/scaling';
import {useTranslation} from 'react-i18next';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Vaccination from '../Vaccination';

const ImmunizationScreen = () => {
  const {t} = useTranslation();
  const ImmunizationTabs = createMaterialTopTabNavigator();

  return (
    <SafeAreaView>
      <View>
        <View style={globalStyle.marginTop60}>
          <View style={styles.container}>
            <ImmunizationTabs.Navigator
              screenOptions={{
                tabBarLabelStyle: [
                  globalStyle.descriptionGrey,
                  {textTransform: 'none'},
                ],
                tabBarStyle: {backgroundColor: '#f2f2f2'},
                tabBarIndicatorStyle: {backgroundColor: 'transparent'},
                tabBarItemStyle: {width: verticalScale(190)},
                tabBarScrollEnabled: true,
              }}>
              <ImmunizationTabs.Screen
                name={t('patientSummary.immunization.title')}
                component={Vaccination}
              />
            </ImmunizationTabs.Navigator>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ImmunizationScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
