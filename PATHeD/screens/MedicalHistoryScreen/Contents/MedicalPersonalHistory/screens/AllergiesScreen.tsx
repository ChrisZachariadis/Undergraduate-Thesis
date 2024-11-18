import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import globalStyle from '../../../../../assets/styles/globalStyle';
import AllergiesAndIntolerances from '../AllergiesAndIntolerances';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {verticalScale} from '../../../../../assets/styles/scaling';

const AllergiesScreen = () => {
  const {t} = useTranslation();
  const AllergiesTabs = createMaterialTopTabNavigator();

  return (
    <SafeAreaView>
      <View>
        <View style={globalStyle.marginTop60}>
          <View style={styles.container}>
            <AllergiesTabs.Navigator
              screenOptions={{
                tabBarLabelStyle: [
                  globalStyle.descriptionGrey,
                  {textTransform: 'none'},
                ],
                tabBarStyle: {backgroundColor: '#f2f2f2'},
                tabBarIndicatorStyle: {backgroundColor: 'transparent'},
                tabBarItemStyle: {width: verticalScale(190)},
              }}>
              <AllergiesTabs.Screen
                name={t('patientSummary.allergies.title')}
                component={AllergiesAndIntolerances}
              />
            </AllergiesTabs.Navigator>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AllergiesScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
