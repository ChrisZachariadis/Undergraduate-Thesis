import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import globalStyle from '../../../../../assets/styles/globalStyle';
import CurrentProblems from '../CurrentProblems';
import ResolvedProblems from '../ResolvedProblems';
import Procedures from '../Procedures';
import FunctionalStatus from '../FunctionalStatus';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {scaleFontSize} from '../../../../../assets/styles/scaling';

const ProblemsScreen = () => {
  const {t} = useTranslation();
  const ProblemsTabs = createMaterialTopTabNavigator();

  return (
    <SafeAreaView>
      <View>
        <View style={globalStyle.marginTop60}>
          <View style={styles.container}>
            <ProblemsTabs.Navigator
              screenOptions={{
                tabBarLabelStyle: [
                  globalStyle.descriptionGrey,
                  {textTransform: 'none', fontSize: scaleFontSize(12)},
                ],
                tabBarStyle: {backgroundColor: '#f2f2f2'},
                tabBarIndicatorStyle: {backgroundColor: '#33C3BB'},
              }}>
              <ProblemsTabs.Screen
                name={t('patientSummary.problems.current')}
                component={CurrentProblems}
              />
              <ProblemsTabs.Screen
                name={t('patientSummary.problems.resolved')}
                component={ResolvedProblems}
              />
              <ProblemsTabs.Screen
                name={t('patientSummary.problems.procedures')}
                component={Procedures}
              />
              <ProblemsTabs.Screen
                name={t('patientSummary.problems.functional-status')}
                component={FunctionalStatus}
              />
            </ProblemsTabs.Navigator>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProblemsScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
