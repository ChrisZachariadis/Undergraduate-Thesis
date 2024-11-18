import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../../../assets/styles/scaling';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: horizontalScale(20),
    height: '95%',
  },
  inputContainer: {
    marginVertical: 15,
  },
  input: {
    borderColor: 'gray',
    borderWidth: scaleFontSize(1),
    borderRadius: scaleFontSize(10),
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(10),
    marginBottom: verticalScale(5),
  },
  errorText: {
    color: 'red',
  },
  buttonContainer: {
    position: 'absolute',
    left: horizontalScale(55),
    bottom: verticalScale(15),
  },
  scrollContainer: {
    height: 80,
    width: '50%',
    left: '25%',
  },
});

export default styles;
