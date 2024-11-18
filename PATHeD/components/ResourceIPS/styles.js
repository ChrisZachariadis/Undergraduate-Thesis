import {StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize} from '../../assets/styles/scaling';

const styles = StyleSheet.create({
  button: {
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: horizontalScale(5),
  },
  checkBoxContainer: {
    marginHorizontal: horizontalScale(10),
  },
  resourceContainer: {
    flex: 1,
    marginRight: horizontalScale(10),
  },
  typeText: {
    fontSize: scaleFontSize(16),
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default styles;
