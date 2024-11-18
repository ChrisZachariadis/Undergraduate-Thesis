import {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useRecoilState, useResetRecoilState} from 'recoil';
import {userState} from '../recoil/atoms/User/userState';
import {UserPreferencesState} from '../recoil/atoms/UserPreferences/UserPreferencesState';
import {TokensUtils} from 'react-native-keycloak-plugin';
import {RefreshToken, signOut} from './auth';
import {patientSummaryState} from '../recoil/atoms/PatientSummary/PatientSummaryState';

const LOGOUT = 'Logout';
const AUTHENTICATION = 'Authentication';
const TOKEN_REFRESH_THRESHOLD = 20;
const TOKEN_REFRESH_INTERVAL = 5000;

async function handleLogout(resetUser, resetSummary, resetKeychain) {
  await signOut(resetKeychain);
  resetUser();
  resetSummary();
}

async function refreshableFetch(keepLoggedIn, token) {
  if (token === '') {
    return 'Logged Out';
  }
  try {
    const expiredToken = await TokensUtils.isAccessTokenExpired();
    const expiringTokenSoon = await TokensUtils.willAccessTokenExpireInLessThan(
      TOKEN_REFRESH_THRESHOLD,
    );
    return !expiredToken || expiringTokenSoon
      ? await RefreshToken(keepLoggedIn)
      : 'All good';
  } catch (error) {
    return keepLoggedIn ? await RefreshToken(keepLoggedIn) : 'Logged Out';
  }
}

const TokenManager = () => {
  const {t} = useTranslation();
  const [isPaused, setIsPaused] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const resetUser = useResetRecoilState(userState);
  const resetSummary = useResetRecoilState(patientSummaryState);
  const [userPreferences, _] = useRecoilState(UserPreferencesState);

  const showAlert = useCallback(
    alertType => {
      let description = '';
      let resetKeycloak = true;
      if (alertType === LOGOUT) {
        description = t('login.token-alert-description');
      } else if (alertType === AUTHENTICATION) {
        description = t('login.token-authentication-description');
        resetKeycloak = false;
      }
      Alert.alert(t('login.token-alert-title'), description, [
        {
          text: t('general.continue'),
          onPress: () => {
            handleLogout(resetUser, resetSummary, resetKeycloak);
            setIsPaused(false);
          },
        },
      ]);
    },
    [resetUser, resetSummary, t],
  );

  useEffect(() => {
    const fetchData = async () => {
      const message = await refreshableFetch(
        userPreferences.keepLoggedIn,
        user.token,
      );
      if (message.status === 'LoggoutAlert') {
        setIsPaused(true);
        showAlert(LOGOUT);
      } else if (message.status === 'AuthenticationAlert') {
        setIsPaused(true);
        showAlert(AUTHENTICATION);
      } else if (message.status === 'SuccesfulRefresh') {
        setUser(currentUser => ({
          ...currentUser,
          token: message.token,
        }));
      }
    };

    if (!isPaused) {
      const intervalId = setInterval(() => {
        fetchData();
      }, TOKEN_REFRESH_INTERVAL); // Every 5 seconds

      // Cleanup function to clear the interval when the component is unmounted or if the effect is rerun.
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [
    userPreferences,
    isPaused,
    showAlert,
    user,
    setUser,
    resetUser,
    resetSummary,
  ]);
};

export default TokenManager;
