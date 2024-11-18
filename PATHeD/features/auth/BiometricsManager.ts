import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

export const checkBiometrics = async (promt: string) => {
  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });
  const {available, biometryType} = await rnBiometrics.isSensorAvailable();
  const promptMessage = promt;

  // Checking Touch ID (IOS only)
  if (available && biometryType === BiometryTypes.TouchID) {
    const {success} = await rnBiometrics.simplePrompt({promptMessage});
    return {status: success ? 'Success' : 'Failure'};

    // Checking Face ID (IOS only)
  } else if (available && biometryType === BiometryTypes.FaceID) {
    const {success} = await rnBiometrics.simplePrompt({promptMessage});
    return {status: success ? 'Success' : 'Failure'};

    // Checking Face recognition or Fingerprint (Android only)
  } else if (available && biometryType === BiometryTypes.Biometrics) {
    const {success} = await rnBiometrics.simplePrompt({promptMessage});
    return {status: success ? 'Success' : 'Failure'};

    // Not secure phone
  } else {
    return {status: 'NotSecured'};
  }
};

export const isPhoneSecuredCheck = async () => {
  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });
  const {available} = await rnBiometrics.isSensorAvailable();
  return available;
};
