import React from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import styles from './style';
import globalStyle from '../../assets/styles/globalStyle';
import NavigationButton from '../../components/NavigationButton/NavigationButton';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import {useRecoilState, useResetRecoilState} from 'recoil';
import {userState} from '../../features/recoil/atoms/User/userState';
import {UserPreferencesState} from '../../features/recoil/atoms/UserPreferences/UserPreferencesState';
import {signOut} from '../../features/auth/auth';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import {patientSummaryState} from '../../features/recoil/atoms/PatientSummary/PatientSummaryState';

const SettingsScreen = () => {
  const {t} = useTranslation();
  const [_, setUserPreferences] = useRecoilState(UserPreferencesState);
  const resetUser = useResetRecoilState(userState);
  const resetSummary = useResetRecoilState(patientSummaryState);
  const [LanguageModalVisible, setLanguageModalVisible] = React.useState(false);
  const [TermsModalVisible, setTermsModalVisible] = React.useState(false);
  const [PrivacyModalVisible, setPrivacyModalVisible] = React.useState(false);
  const [AboutModalVisible, setAboutModalVisible] = React.useState(false);

  async function handleLogout() {
    await signOut(true);
    setUserPreferences(currentUserPreferences => ({
      ...currentUserPreferences,
      keepLoggedIn: false,
    }));
    resetUser();
    resetSummary();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={globalStyle.marginTop60}>
        <LanguageSelector
          isPatientSummary={true}
          isVisible={LanguageModalVisible}
          onClose={() => setLanguageModalVisible(false)}
          setUserPreferences={setUserPreferences}
        />
        <NavigationButton
          type={'withArrow'}
          title={t('general.language')}
          onPress={() => {
            setLanguageModalVisible(true);
          }}
          bottomBorderStyle={globalStyle.bottomBorderL3}
          titleStyle={globalStyle.descriptionBlackL1}
        />

        {/* Terms of use */}
        <ModalComponent
          title={t('settings.terms')}
          visibility={TermsModalVisible}
          onClose={() => setTermsModalVisible(false)}>
          <ScrollView>
            <Text style={styles.modalInformation}>
              {t('settings.terms-description')}
            </Text>
          </ScrollView>
        </ModalComponent>

        <NavigationButton
          type={'withArrow'}
          title={t('settings.terms')}
          onPress={() => {
            setTermsModalVisible(true);
          }}
          bottomBorderStyle={globalStyle.bottomBorderL3}
          titleStyle={globalStyle.descriptionBlackL1}
        />

        {/* Privacy Policy */}
        <ModalComponent
          title={t('settings.privacy-policy')}
          visibility={PrivacyModalVisible}
          onClose={() => setPrivacyModalVisible(false)}>
          <ScrollView>
            <Text style={styles.modalInformation}>
              {t('settings.privacy-policy-description')}
            </Text>
          </ScrollView>
        </ModalComponent>

        <NavigationButton
          type={'withArrow'}
          title={t('settings.privacy-policy')}
          onPress={() => {
            setPrivacyModalVisible(true);
          }}
          bottomBorderStyle={globalStyle.bottomBorderL3}
          titleStyle={globalStyle.descriptionBlackL1}
        />

        {/* About */}
        <ModalComponent
          title={t('dictionary.about')}
          visibility={AboutModalVisible}
          onClose={() => setAboutModalVisible(false)}>
          <ScrollView>
            <Text style={styles.modalInformation}>
              {t('settings.about-description')}
            </Text>
          </ScrollView>
        </ModalComponent>

        <NavigationButton
          type={'withArrow'}
          title={t('dictionary.about')}
          onPress={() => {
            setAboutModalVisible(true);
          }}
          bottomBorderStyle={globalStyle.bottomBorderL3}
          titleStyle={globalStyle.descriptionBlackL1}
        />

        {/* Logout */}
        <NavigationButton
          type={'withArrow'}
          title={t('settings.logout')}
          onPress={() => {
            handleLogout();
          }}
          titleStyle={globalStyle.descriptionBlackL1}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
