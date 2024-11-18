import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';

const styles = StyleSheet.create({
  ProfileContainer: {
    alignItems: 'center',
    marginTop: verticalScale(30),
    marginBottom: verticalScale(20),
  },
  ImageContainer: {
    justifyContent: 'center',
  },
  ImageStyle: {
    width: horizontalScale(60),
    height: horizontalScale(60),
  },
  ImageInitials: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: scaleFontSize(26),
    color: '#00827B',
  },
  Name: {
    fontWeight: '700',
    fontSize: scaleFontSize(20),
    marginTop: verticalScale(5),
    marginBottom: verticalScale(10),
    justifyContent: 'center',
  },
  ButtonContainer: {
    marginTop: verticalScale(50),
  },
  informationContainer: {
    marginTop: verticalScale(20),
    marginLeft: horizontalScale(20),
  },
  descriptions: {
    color: '#000000',
    fontSize: scaleFontSize(16),
    fontWeight: '600',
    marginBottom: verticalScale(10),
    marginLeft: horizontalScale(20),
  },
  sections: {
    marginBottom: verticalScale(35),
  },
  informationBox: {
    height: horizontalScale(50),
    borderBottomWidth: scaleFontSize(1),
    borderColor: '#E2E2E2',
    justifyContent: 'space-evenly',
  },
  marginLeft20: {
    marginLeft: horizontalScale(20),
  },
});

export default styles;
