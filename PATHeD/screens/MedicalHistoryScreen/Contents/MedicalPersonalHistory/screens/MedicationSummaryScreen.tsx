import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import globalStyle from '../../../../../assets/styles/globalStyle';
import MedicationSummary from '../MedicationSummary';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {verticalScale} from '../../../../../assets/styles/scaling';

const MedicationSummaryScreen = () => {
  const {t} = useTranslation();
  const MedicationTabs = createMaterialTopTabNavigator();

  return (
    <SafeAreaView>
      <View>
        <View style={globalStyle.marginTop60}>
          <View style={styles.container}>
            <MedicationTabs.Navigator
              screenOptions={{
                tabBarLabelStyle: [
                  globalStyle.descriptionGrey,
                  {textTransform: 'none'},
                ],
                tabBarStyle: {backgroundColor: '#f2f2f2'},
                tabBarIndicatorStyle: {backgroundColor: 'transparent'},
                tabBarItemStyle: {width: verticalScale(160)},
              }}>
              <MedicationTabs.Screen
                name={t('patientSummary.medication-summary.title')}
                component={MedicationSummary}
              />
            </MedicationTabs.Navigator>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MedicationSummaryScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
