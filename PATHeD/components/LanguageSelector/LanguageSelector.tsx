import {ScrollView} from 'react-native';
import NavigationButton from '../NavigationButton/NavigationButton';
import i18n from '../../assets/translations/i18next';
import globalStyle from '../../assets/styles/globalStyle';
import ModalComponent from '../ModalComponent/ModalComponent';
import React from 'react';
import {t} from 'i18next';

interface LanguageSelectorProps {
  isVisible: boolean;
  isPatientSummary: boolean;
  onClose: () => void;
  setUserPreferences: (preferences: any) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  isVisible,
  isPatientSummary,
  onClose,
  setUserPreferences,
}) => {
  const changeLanguage = (languageCode: string, languageName: string) => {
    i18n.changeLanguage(languageCode);
    setUserPreferences(currentUserPreferences => ({
      ...currentUserPreferences,
      language: languageName,
    }));
    onClose(); // Close the modal after changing the language
  };

  return (
    <ModalComponent
      title={t('general.language')}
      visibility={isVisible}
      onClose={onClose}>
      <ScrollView>
        <NavigationButton
          type={'withIcon'}
          countryIso={'gb'}
          title={'English'}
          onPress={() => changeLanguage('en', 'English')}
          bottomBorderStyle={globalStyle.bottomBorderL3}
          titleStyle={globalStyle.descriptionBlackL1}
        />
        <NavigationButton
          type={'withIcon'}
          countryIso={'gr'}
          title={'Ελληνικά'}
          onPress={() => changeLanguage('gr', 'Greek')}
          bottomBorderStyle={globalStyle.bottomBorderL3}
          titleStyle={globalStyle.descriptionBlackL1}
        />
        {isPatientSummary && (
          <>
            <NavigationButton
              type={'withIcon'}
              countryIso={'pt'}
              title={'Português'}
              onPress={() => changeLanguage('pt', 'Portuguese')}
              bottomBorderStyle={globalStyle.bottomBorderL3}
              titleStyle={globalStyle.descriptionBlackL1}
            />
            <NavigationButton
              type={'withIcon'}
              countryIso={'hu'}
              title={'Magyar'}
              onPress={() => changeLanguage('hu', 'Hungarian')}
              bottomBorderStyle={globalStyle.bottomBorderL3}
              titleStyle={globalStyle.descriptionBlackL1}
            />
            <NavigationButton
              type={'withIcon'}
              countryIso={'si'}
              title={'Slovenský'}
              onPress={() => changeLanguage('si', 'Slovak')}
              bottomBorderStyle={globalStyle.bottomBorderL3}
              titleStyle={globalStyle.descriptionBlackL1}
            />
            <NavigationButton
              type={'withIcon'}
              countryIso={'cz'}
              title={'Čeština'}
              onPress={() => changeLanguage('cz', 'Czech')}
              bottomBorderStyle={globalStyle.bottomBorderL3}
              titleStyle={globalStyle.descriptionBlackL1}
            />
            <NavigationButton
              type={'withIcon'}
              countryIso={'fr'}
              title={'Française'}
              onPress={() => changeLanguage('fr', 'French')}
              bottomBorderStyle={globalStyle.bottomBorderL3}
              titleStyle={globalStyle.descriptionBlackL1}
            />
            <NavigationButton
              type={'withIcon'}
              countryIso={'es'}
              title={'Española'}
              onPress={() => changeLanguage('es', 'Spanish')}
              bottomBorderStyle={globalStyle.bottomBorderL3}
              titleStyle={globalStyle.descriptionBlackL1}
            />
            <NavigationButton
              type={'withIcon'}
              countryIso={'nl'}
              title={'Nederlands'}
              onPress={() => changeLanguage('nl', 'Dutch')}
              titleStyle={globalStyle.descriptionBlackL1}
            />
          </>
        )}
      </ScrollView>
    </ModalComponent>
  );
};

export default LanguageSelector;
