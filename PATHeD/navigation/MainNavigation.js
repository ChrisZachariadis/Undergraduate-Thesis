import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import AlertsScreen from '../screens/AlertsScreen/AlertsScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {scaleFontSize} from '../assets/styles/scaling';
import MedicalHistoryScreen from '../screens/MedicalHistoryScreen/MedicalHistoryScreen';
import ServicesScreen from '../screens/ServicesScreen/ServicesScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import {useTranslation} from 'react-i18next';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import {t} from 'i18next';
import AllergiesScreen from '../screens/MedicalHistoryScreen/Contents/MedicalPersonalHistory/screens/AllergiesScreen';
import ProblemsScreen from '../screens/MedicalHistoryScreen/Contents/MedicalPersonalHistory/screens/ProblemsScreen';
import SocialHistoryScreen from '../screens/MedicalHistoryScreen/Contents/SocialHistory/Screens/SocialHistoryScreen';
import DevicesScreen from '../screens/MedicalHistoryScreen/Contents/MedicalPersonalHistory/screens/DevicesScreen';
import MedicationSummaryScreen from '../screens/MedicalHistoryScreen/Contents/MedicalPersonalHistory/screens/MedicationSummaryScreen';
import GynecologicalHistoryScreen from '../screens/MedicalHistoryScreen/Contents/GynaecologicalHistory/GynecologicalHistoryScreen';
import ImmunizationScreen from '../screens/MedicalHistoryScreen/Contents/Immunization/Screens/ImmunizationScreen';
import PlanOfCareScreen from '../screens/MedicalHistoryScreen/Contents/PlanOfCare/Screens/PlanOfCareScreen';
import ShlScreen from '../screens/ShlScreen/ShlScreen';

import SmartwatchDetailsScreen from "../screens/SmartwatchScreen/SmartwatchDetailsScreen/SmartwatchDetailsScreen";
import FloorsDetailsScreen from "../screens/SmartwatchScreen/FloorsDetailsScreen/FloorsDetailsScreen";
import StepsDetailsScreen from "../screens/SmartwatchScreen/StepsDetailsScreen/StepsDetailsScreen";
import KcalDetailsScreen from "../screens/SmartwatchScreen/KcalDetailsScreen/KcalDetailsScreen";
import IntensityDetailsScreen from "../screens/SmartwatchScreen/IntensityDetailsScreen/IntensityDetailsScreen";
import StressDetailsScreen from "../screens/SmartwatchScreen/StressDetailsScreen/StressDetailsScreen";
import HRDetails from "../screens/SmartwatchScreen/HRDetails/./HRDetails";
import SmartwatchMenuScreen from "../screens/SmartwatchScreen/SmartwatchMenuScreen/SmartwatchMenuScreen";
import Webview from "../screens/SmartwatchScreen/SmartwatchMenuScreen/Webview";

const ICON_SIZE = scaleFontSize(25);
const INACTIVE_COLOR = '#A4A4A4';
const ACTIVE_COLOR = '#33C3BB';

const stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const NonAuthenticated = () => {
  return (
    <stack.Navigator
      initialRouteName={Routes.LoginScreen}
      screenOptions={{
        header: () => null,
        headerShown: false,
      }}>
      <stack.Screen name={Routes.LoginScreen} component={LoginScreen} />
    </stack.Navigator>
  );
};

export const MyHealthStack = () => {
  const {t} = useTranslation();

  return (
      <stack.Navigator
          initialRouteName={Routes.Home}
          screenOptions={{
              headerShown: true,
              headerTransparent: true, // Set the background color to transparent
          }}>
          <stack.Screen
              name={Routes.Home}
              component={HomeScreen}
              options={{headerShown: true, headerTitle: t('myHealth.title')}}
          />
          <stack.Screen
              name={Routes.Alerts}
              component={AlertsScreen}
              options={{
                  headerShown: true,
                  headerTitle: t('patientSummary.alerts.title'),
              }}
          />


          {/****/}
          {/*My SmartWatch Stack Screens*/}
          {/****/}
          {/*<stack.Screen*/}
          {/*    name={Routes.SmartwatchScreen}*/}
          {/*    component={SmartwatchScreen}*/}
          {/*    options={{headerShown: true, headerTitle: 'Smartwatch Data'}}*/}
          {/*/>*/}
          <stack.Screen
              name={"SmartwatchDetailsScreen"}
              component={SmartwatchDetailsScreen}
              options={{headerShown: true, headerTitle: 'Smartwatch Data'}}
          />
          <stack.Screen
              name={"StepsDetailsScreen"}
              component={StepsDetailsScreen}
              options={{headerShown: true, headerTitle: 'Steps Details Data'}}
          />
          <stack.Screen
              name={"FloorsDetailsScreen"}
              component={FloorsDetailsScreen}
              options={{headerShown: true, headerTitle: 'Floors Details Data'}}
          />
          {/*<stack.Screen*/}
          {/*    name={"HRDetailsScreen"}*/}
          {/*    component={HRDetailsScreen}*/}
          {/*    options={{headerShown: true, headerTitle: 'HR Details Data'}}*/}
          {/*/>*/}
          {/*Alternative HR graph*/}
          <stack.Screen
              name={"HRDetails"}
              component={HRDetails}
              options={{headerShown: true, headerTitle: 'HR Details Data'}}
          />

          <stack.Screen
              name={"KcalDetailsScreen"}
              component={KcalDetailsScreen}
              options={{headerShown: true, headerTitle: 'Kcal Details Data'}}
          />
          <stack.Screen
              name={"IntensityDetailsScreen"}
              component={IntensityDetailsScreen}
              options={{headerShown: true, headerTitle: 'Intensity Details Data'}}
          />
          <stack.Screen
              name={"StressDetailsScreen"}
              component={StressDetailsScreen}
              options={{headerShown: true, headerTitle: 'Stress Details Data'}}
          />
          <stack.Screen
              name={"Webview"}
              component={Webview}
              options={{headerShown: true, headerTitle: ' '}}
          />
          <stack.Screen
              name={"SmartwatchMenuScreen"}
              component={SmartwatchMenuScreen}
              options={{headerShown: true, headerTitle: 'Smartwatch Menu'}}
          />

          <stack.Screen
              name={Routes.MedicalHistory}
              component={MedicalHistoryScreen}
              options={{headerShown: true, headerTitle: t('patientSummary.title')}}
          />
          <stack.Screen
              name={Routes.AllergiesScreen}
              component={AllergiesScreen}
              options={{
                  headerShown: true,
                  headerTitle: t('patientSummary.allergies.title'),
              }}
          />
          <stack.Screen
              name={Routes.ProblemsScreen}
              component={ProblemsScreen}
              options={{
                  headerShown: true,
                  headerTitle: t('patientSummary.problems.current'),
              }}
          />
          <stack.Screen
              name={Routes.SocialHistoryScreen}
              component={SocialHistoryScreen}
              options={{
                  headerShown: true,
                  headerTitle: t('patientSummary.social-history.title'),
              }}
          />
          <stack.Screen
              name={Routes.DevicesScreen}
              component={DevicesScreen}
              options={{
                  headerShown: true,
                  headerTitle: t('patientSummary.devices.title'),
              }}
          />
          <stack.Screen
              name={Routes.MedicationSummaryScreen}
              component={MedicationSummaryScreen}
              options={{
                  headerShown: true,
                  headerTitle: t('patientSummary.medication-summary.title'),
              }}
          />
          <stack.Screen
              name={Routes.GynecologicalHistoryScreen}
              component={GynecologicalHistoryScreen}
              options={{
                  headerShown: true,
                  headerTitle: t('patientSummary.gynaecological.title'),
              }}
          />
          <stack.Screen
              name={Routes.ImmunizationScreen}
              component={ImmunizationScreen}
              options={{
                  headerShown: true,
                  headerTitle: t('patientSummary.immunization.title'),
              }}
          />
          <stack.Screen
              name={Routes.PlanOfCareScreen}
              component={PlanOfCareScreen}
              options={{
                  headerShown: true,
                  headerTitle: t('patientSummary.plan-of-care.title'),
              }}
          />
          <stack.Screen
              name={Routes.Profile}
              component={ProfileScreen}
              options={{headerShown: true, headerTitle: ''}}
          />
          <stack.Screen
              name={Routes.ShlScreen}
              component={ShlScreen}
              options={{headerShown: true, headerTitle: 'Smart Health Link'}}
          />
      </stack.Navigator>
  );
};

export const ServicesStack = () => {
    const {t} = useTranslation();
    return (
        <stack.Navigator
            initialRouteName={Routes.ServicesScreen}
            screenOptions={{
                headerShown: true,
        headerTransparent: true, // Set the background color to transparent
      }}>
      <stack.Screen
        name={Routes.ServicesScreen}
        component={ServicesScreen}
        options={{headerShown: true, headerTitle: t('services.title')}}
      />
    </stack.Navigator>
  );
};

export const SettingsStack = () => {
  const {t} = useTranslation();
  return (
    <stack.Navigator
      initialRouteName={Routes.SettingsScreen}
      screenOptions={{
        headerShown: true,
        headerTransparent: true, // Set the background color to transparent
      }}>
      <stack.Screen
        name={Routes.SettingsScreen}
        component={SettingsScreen}
        options={{headerShown: true, headerTitle: t('settings.title')}}
      />
    </stack.Navigator>
  );
};

export const Authenticated = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: ACTIVE_COLOR,
        activeTintColor: ACTIVE_COLOR, // Change the text color for focused tab
        tintColor: INACTIVE_COLOR,
        tabBarLabelStyle: {
          fontSize: scaleFontSize(16),
        },
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: t('myHealth.title'),
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/forNavigation/myHealth.png')}
              style={{
                width: ICON_SIZE,
                height: ICON_SIZE,
                tintColor: focused ? ACTIVE_COLOR : INACTIVE_COLOR,
              }}
            />
          ),
          headerShown: false,
        }}
        name={t('myHealth.title')}
        component={MyHealthStack}
      />
      <Tab.Screen
        options={{
          title: t('services.title'),
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/forNavigation/Services.png')}
              style={{
                width: ICON_SIZE,
                height: ICON_SIZE,
                tintColor: focused ? ACTIVE_COLOR : INACTIVE_COLOR,
              }}
            />
          ),
          headerShown: false,
        }}
        name={t('services.title')}
        component={ServicesStack}
      />
      <Tab.Screen
        options={{
          title: t('settings.title'),
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/forNavigation/Settings.png')}
              style={{
                width: ICON_SIZE,
                height: ICON_SIZE,
                tintColor: focused ? ACTIVE_COLOR : INACTIVE_COLOR,
              }}
            />
          ),
          headerShown: false,
        }}
        name={t('settings.title')}
        component={SettingsStack}
      />
    </Tab.Navigator>
  );
};
