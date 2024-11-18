import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import globalStyle from '../../assets/styles/globalStyle';
import {useTranslation} from 'react-i18next';
import NavigationButton from '../../components/NavigationButton/NavigationButton';
import styles from './style';
import CountryFlag from 'react-native-country-flag';
import {useRecoilState, useRecoilValue} from 'recoil';
import {UserPreferencesState} from '../../features/recoil/atoms/UserPreferences/UserPreferencesState';
import {
  LANGUAGE_ISO_CODE,
  PATHED_TRANSCODES,
} from '../../common/constants/constants';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import {getPatientSummary} from './api/patientSummaryAPI';
import {userState} from '../../features/recoil/atoms/User/userState';
import {patientSummaryState} from '../../features/recoil/atoms/PatientSummary/PatientSummaryState';
import NetInfo from '@react-native-community/netinfo';
import Loading from '../../components/Loading/Loading';

const MedicalHistoryScreen = ({navigation}) => {
  const {t} = useTranslation();
  const user = useRecoilValue(userState);
  const [userPreferences, setUserPreferences] =
    useRecoilState(UserPreferencesState);
  const [LanguageModalVisible, setLanguageModalVisible] = React.useState(false);
  const [_, setPatientSummary] = useRecoilState(patientSummaryState);
  const [loading, setLoading] = React.useState(true);
  const fetchData = async () => {
    try {
      return await getPatientSummary(
        user.token,
        user.id,
        PATHED_TRANSCODES[userPreferences.language],
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        fetchData().then(newData => {
          setPatientSummary(newData);
          setLoading(false);
        });
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.pageSize}>
      <View style={[globalStyle.marginTop60, globalStyle.backgroundWhite]}>
        <LanguageSelector
          isVisible={LanguageModalVisible}
          isPatientSummary={true}
          onClose={() => setLanguageModalVisible(false)}
          setUserPreferences={setUserPreferences}
        />

        <ScrollView>
          <NavigationButton
            type={'withArrow'}
            title={t('patientSummary.allergies.title')}
            onPress={() => {
              navigation.navigate('AllergiesScreen');
            }}
            bottomBorderStyle={globalStyle.bottomBorderL1}
            titleStyle={globalStyle.descriptionBlackL1}
          />
          <NavigationButton
            type={'withArrow'}
            title={t('patientSummary.problems.title')}
            onPress={() => {
              navigation.navigate('ProblemsScreen');
            }}
            bottomBorderStyle={globalStyle.bottomBorderL1}
            titleStyle={globalStyle.descriptionBlackL1}
          />
          <NavigationButton
            type={'withArrow'}
            title={t('patientSummary.devices.title')}
            onPress={() => {
              navigation.navigate('DevicesScreen');
            }}
            bottomBorderStyle={globalStyle.bottomBorderL1}
            titleStyle={globalStyle.descriptionBlackL1}
          />
          <NavigationButton
            type={'withArrow'}
            title={t('patientSummary.medication-summary.title')}
            onPress={() => {
              navigation.navigate('MedicationSummaryScreen');
            }}
            bottomBorderStyle={globalStyle.bottomBorderL1}
            titleStyle={globalStyle.descriptionBlackL1}
          />

          <NavigationButton
            type={'withArrow'}
            title={t('patientSummary.gynaecological.title')}
            onPress={() => {
              navigation.navigate('GynecologicalHistoryScreen');
            }}
            bottomBorderStyle={globalStyle.bottomBorderL1}
            titleStyle={globalStyle.descriptionBlackL1}
          />
          <NavigationButton
            type={'withArrow'}
            title={t('patientSummary.social-history.title')}
            onPress={() => {
              navigation.navigate('SocialHistoryScreen');
            }}
            bottomBorderStyle={globalStyle.bottomBorderL1}
            titleStyle={globalStyle.descriptionBlackL1}
          />
          <NavigationButton
            type={'withArrow'}
            title={t('patientSummary.immunization.title')}
            onPress={() => {
              navigation.navigate('ImmunizationScreen');
            }}
            bottomBorderStyle={globalStyle.bottomBorderL1}
            titleStyle={globalStyle.descriptionBlackL1}
          />
          <NavigationButton
            type={'withArrow'}
            title={t('patientSummary.plan-of-care.title')}
            onPress={() => {
              navigation.navigate('PlanOfCareScreen');
            }}
            titleStyle={globalStyle.descriptionBlackL1}
          />
        </ScrollView>
      </View>
      <TouchableOpacity
        style={[globalStyle.fullyCentered, styles.changeLanguageContainer]}
        onPress={() => {
          setLanguageModalVisible(true);
        }}>
        <Text
          style={[globalStyle.descriptionBlackL3, styles.changeLanguageText]}>
          {t('general.view-language')}
        </Text>
        <View style={[globalStyle.row, styles.displayLanguageContainer]}>
          <CountryFlag
            isoCode={LANGUAGE_ISO_CODE[userPreferences.language]}
            size={25}
          />
          <Text style={globalStyle.descriptionBlackL2}>
            {'  '}
            {t(`general.${userPreferences.language.toLowerCase()}`)}
          </Text>
        </View>
        <Text style={[globalStyle.descriptionBlackL2, styles.changeLanguage]}>
          {t('general.translate-summary')}
        </Text>
      </TouchableOpacity>
      {loading && <Loading />}
    </SafeAreaView>
  );
};

export default MedicalHistoryScreen;
