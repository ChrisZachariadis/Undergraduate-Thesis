import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';

const styles = StyleSheet.create({
  toggle: {
    height: verticalScale(50),
    backgroundColor: '#F5F5F7',
    borderTopColor: '#D1D1D1',
    borderTopWidth: scaleFontSize(1),
  },
  toggleText: {
    justifyContent: 'center',
    marginLeft: horizontalScale(15),
    marginTop: verticalScale(15),
  },
  arrow_image: {
    width: scaleFontSize(20),
    height: scaleFontSize(20),
    tintColor: '#A4A4A4',
  },
  arrow_container: {
    position: 'absolute',
    marginTop: verticalScale(15),
    right: horizontalScale(25),
  },
});

export default styles;
