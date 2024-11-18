import {Alert, Linking} from 'react-native';
import Clipboard from '@react-native-community/clipboard';

export const copyToClipboard = (
  url: string,
  alertTitle: string,
  alertContinue: string,
) => {
  Clipboard.setString(url);
  Alert.alert(alertTitle, '', [{text: alertContinue}]);
};

const openURL = (url: string) => {
  Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
};

export function showAlertAndOpenURL(
  url: string,
  title: string,
  message: string,
  cancel: string,
  ok: string,
) {
  Alert.alert(
    title,
    message,
    [
      {text: cancel, style: 'cancel'},
      {text: ok, onPress: () => openURL(url)},
    ],
    {cancelable: true},
  );
}

export function sendEmail(email: string, subject: string, body: string) {
  const url = `mailto:${email}?subject=${subject}&body=${body}`;

  Linking.openURL(url).catch(err => console.error('An error occurred', err));
}
