import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../../../assets/styles/scaling';
import {UI_COLOURS} from '../../../../common/constants/constants';

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  marginTop: {
    marginTop: verticalScale(20),
  },
  pregnancyContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: UI_COLOURS.buttons,
    padding: verticalScale(20),
    borderRadius: scaleFontSize(55),
    marginBottom: verticalScale(10),
  },
  pregnancyInfoContainer: {
    marginTop: verticalScale(10),
    width: '90%',
    marginRight: horizontalScale(20),
  },
  childerContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(-8),
  },
  childerMargins: {
    marginLeft: horizontalScale(5),
  },
  birthdaysContainer: {
    marginTop: horizontalScale(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  birthdaysText: {
    marginLeft: verticalScale(5),
    textDecorationLine: 'underline',
  },
});

export default styles;
