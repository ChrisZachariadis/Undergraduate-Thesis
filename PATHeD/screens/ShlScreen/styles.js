import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  screenContainer: {
    flex: 1,
    marginHorizontal: horizontalScale(15),
    marginTop: verticalScale(20),
  },
  infoIconContainer: {
    position: 'absolute',
    borderColor: '#212121',
    top: verticalScale(12),
    right: horizontalScale(15),
    padding: horizontalScale(4),
    borderWidth: scaleFontSize(2.5),
    borderRadius: scaleFontSize(20),
  },
  infoContainer: {
    textAlign: 'justify',
    marginTop: verticalScale(15),
    marginLeft: horizontalScale(20),
    marginRight: horizontalScale(30),
  },
  myLinksText: {
    color: '#212121',
    fontWeight: '700',
    fontFamily: 'Inter',
    fontSize: scaleFontSize(25),
    marginTop: verticalScale(50),
    lineHeight: scaleFontSize(25),
    marginLeft: horizontalScale(10),
    marginBottom: verticalScale(10),
  },
  createContainer: {
    position: 'absolute',
    bottom: verticalScale(20),
    width: '100%',
  },
});

export default styles;
