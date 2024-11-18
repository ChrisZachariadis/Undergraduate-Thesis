import {useTranslation} from 'react-i18next';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import globalStyle from '../../../../../assets/styles/globalStyle';
import {verticalScale} from '../../../../../assets/styles/scaling';
import React from 'react';
import PlanOfCare from '../PlanOfCare';

const PlanOfCareScreen = () => {
  const {t} = useTranslation();
  const PlanOfCareTabs = createMaterialTopTabNavigator();

  return (
    <SafeAreaView>
      <View>
        <View style={globalStyle.marginTop60}>
          <View style={styles.container}>
            <PlanOfCareTabs.Navigator
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
              <PlanOfCareTabs.Screen
                name={t('patientSummary.plan-of-care.title')}
                component={PlanOfCare}
              />
            </PlanOfCareTabs.Navigator>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PlanOfCareScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
