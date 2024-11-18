import React, {useState} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useRecoilState} from 'recoil';
import {summaryResourcesState} from '../../../../features/recoil/atoms/SummaryResources/summaryResourcesState';
import globalStyle from '../../../../assets/styles/globalStyle';
import styles from './style';
import {generateSHLink} from '../../api/shlFunctions';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import dayjs from 'dayjs';
import {DATE_FORMAT} from '../../../../common/constants/constants';
import {encode as btoa} from 'base-64';
import {shlHistoryState} from '../../../../features/recoil/atoms/ShlHistory/shlHistoryState';
import {IShl} from '../../../../features/recoil/interfaces/IShl';
import {SummaryResources} from '../../../../features/recoil/atoms/SummaryResources/SummaryResources';
import ScrollPicker from 'react-native-wheel-scrollview-picker';

interface Props {
  closeModal: (visible: boolean) => void;
}

const ShlGeneration = (props: Props) => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);
  const [summaryResources, setSummaryResources] = useRecoilState(
    summaryResourcesState,
  );
  const [shlHistory, setShlHistory] = useRecoilState(shlHistoryState);
  const [label, setLabel] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [expirationValue, setExpirationValue] = useState(0);
  const expirationOptions = [
    {display: t('shl.generation.1h'), value: 1},
    {display: t('shl.generation.4h'), value: 4},
    {display: t('shl.generation.12h'), value: 12},
    {display: t('shl.generation.1d'), value: 24},
    {display: t('shl.generation.1w'), value: 24 * 7},
    {display: t('shl.generation.1m'), value: 24 * 31},
    {display: t('shl.generation.3m'), value: 24 * 31 * 3},
    {display: t('shl.generation.6m'), value: 24 * 31 * 6},
    {display: t('shl.generation.1y'), value: 24 * 365},
  ];
  const [pause, setPause] = useState(false);

  const validatePassword = () => {
    if (password.length >= 6 && password.length <= 15) {
      setError('');
      return true;
    } else {
      setError(t('shl.generation.password-error'));
      return false;
    }
  };

  const checkAndGenerate = async () => {
    if (pause) {
      return;
    }
    setPause(true);
    if (!validatePassword()) {
      setPause(false);
      return 'Wrong password';
    }
    const name =
      label === '' ? `Link generated on ${dayjs().format(DATE_FORMAT)}` : label;
    const expirationDate = dayjs()
      .add(expirationOptions[expirationValue].value, 'hour')
      .toString();

    const minifiedResources = JSON.stringify(summaryResources.resources);
    try {
      const response = await generateSHLink(
        user.token,
        user.id,
        password,
        name,
        expirationDate,
        btoa(minifiedResources),
      );
      const newLink: IShl = {
        shl: response.data,
        label: name,
        passcode: password,
        expirationDate: expirationDate,
        accessCount: 0,
        failedAccessCount: 0,
      };

      const updatedShlHistory = {
        shLinks: [...shlHistory.shLinks, newLink],
      };
      setShlHistory(updatedShlHistory);
      return 'Success';
    } catch (errorMessage) {
      return 'Failure';
    } finally {
      setPause(false);
    }
  };

  const handleSliderChange = (newValue: string) => {
    const newExpirationValue = expirationOptions.findIndex(
      option => option.display === newValue,
    );
    setExpirationValue(newExpirationValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={globalStyle.descriptionBlackL1}>
          {t('shl.generation.passcode-title')}
        </Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder={t('shl.generation.passcode-placeholder')}
          value={password}
          onChangeText={setPassword}
          onBlur={validatePassword}
          maxLength={16}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
      <View style={styles.inputContainer}>
        <Text style={globalStyle.descriptionBlackL1}>
          {t('shl.generation.label-title')}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={t('shl.generation.label-placeholder')}
          value={label}
          onChangeText={setLabel}
          maxLength={42}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={globalStyle.descriptionBlackL1}>
          {t('shl.generation.expiration-title')}
        </Text>
        <View style={styles.scrollContainer}>
          <ScrollPicker
            dataSource={expirationOptions.map(option => option.display)}
            selectedIndex={expirationValue}
            onValueChange={handleSliderChange}
            highlightColor="grey"
            wrapperBackground="#FFFFFF"
            wrapperHeight={80}
            highlightBorderWidth={1}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={globalStyle.Button}
          onPress={async () => {
            const result = await checkAndGenerate()
              .then(result => result)
              .catch(error => error);

            switch (result) {
              case 'Success':
                Alert.alert(
                  'Link Created',
                  'The link was successfully created! You can find it in the SHL History.',
                  [
                    {
                      text: 'Continue',
                      onPress: () => {
                        props.closeModal(false);
                        setSummaryResources(new SummaryResources(false, []));
                      },
                    },
                  ],
                  {cancelable: false},
                );
                break;
              case 'Failure':
                Alert.alert(
                  'Failure',
                  'Something went wrong. Please try again later.',
                  [{text: 'OK'}],
                  {cancelable: false},
                );
                break;
              default:
                break;
            }
          }}>
          <Text style={globalStyle.buttonText}>{t('shl.create')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShlGeneration;
