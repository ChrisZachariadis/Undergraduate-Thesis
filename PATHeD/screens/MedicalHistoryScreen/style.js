import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';

const styles = StyleSheet.create({
  pageSize: {
    flex: 1,
  },
  changeLanguageContainer: {
    position: 'absolute',
    alignSelf: 'center',
    marginHorizontal: horizontalScale(0),
    bottom: verticalScale(50),
  },
  changeLanguageText: {
    textAlign: 'center',
  },
  changeLanguage: {
    color: '#0C6C79',
    textDecorationLine: 'underline',
  },
  displayLanguageContainer: {
    alignItems: 'center',
    marginVertical: verticalScale(3),
  },
});

export default styles;
