import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(55),
    paddingLeft: horizontalScale(15),
  },
  title: {
    marginLeft: horizontalScale(10),
  },
  red_title: {
    color: '#FF0000',
    marginLeft: horizontalScale(10),
  },
  arrow_container: {
    position: 'absolute',
    right: horizontalScale(25),
  },
  icon_image: {
    width: scaleFontSize(25),
    height: scaleFontSize(25),
  },
  arrow_image: {
    width: scaleFontSize(20),
    height: scaleFontSize(20),
    tintColor: '#A4A4A4',
  },
});

export default styles;
