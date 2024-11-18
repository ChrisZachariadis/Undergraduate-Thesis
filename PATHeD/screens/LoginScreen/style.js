import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';

const styles = StyleSheet.create({
  ImageContainer: {
    height: verticalScale(260),
  },
  LoginContainer: {
    borderTopLeftRadius: scaleFontSize(20),
    borderTopRightRadius: scaleFontSize(20),
  },
  PasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  login: {
    fontWeight: '700',
    marginTop: verticalScale(30),
    marginLeft: horizontalScale(24),
  },
  input: {
    width: horizontalScale(320),
    height: verticalScale(60),
    borderColor: '#D8D8D8',
    borderWidth: scaleFontSize(2),
    marginTop: verticalScale(20),
    borderRadius: scaleFontSize(10),
    marginLeft: horizontalScale(25),
    paddingLeft: horizontalScale(15),
  },
  passwordIcon: {
    right: horizontalScale(60),
    top: verticalScale(10),
  },
  forgot: {
    color: '#497C79',
    marginTop: verticalScale(30),
    marginLeft: horizontalScale(25),
    fontSize: scaleFontSize(16),
  },
  SignUpButton: {
    flexDirection: 'row',
    marginTop: verticalScale(20),
  },
  signInDescription: {
    marginLeft: horizontalScale(25),
    fontSize: scaleFontSize(16),
  },
  signInPrompt: {
    color: '#497C79',
    fontWeight: '800',
    marginLeft: horizontalScale(10),
    fontSize: scaleFontSize(16),
  },
  errorMessage: {
    color: '#D41A1A',
    marginLeft: horizontalScale(25),
    marginTop: verticalScale(10),
    fontSize: scaleFontSize(16),
  },
  keepLoggedInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: horizontalScale(20),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(20),
  },
  changeLanguageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: verticalScale(15),
    right: horizontalScale(10),
  },
  changeLanguageImage: {
    width: scaleFontSize(30),
    height: scaleFontSize(30),
    marginLeft: horizontalScale(5),
  },
  logo: {
    marginTop: verticalScale(20),
    width: horizontalScale(150),
    height: verticalScale(150),
  },
});

export default styles;
