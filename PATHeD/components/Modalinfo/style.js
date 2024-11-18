import {StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize} from '../../assets/styles/scaling';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: horizontalScale(10),
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: scaleFontSize(1),
    justifyContent: 'center',
    paddingLeft: horizontalScale(20),
  },
});

export default styles;
