import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.21)',
    height: '100%',
  },
  modalView: {
    height: verticalScale(650),
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(30),
    backgroundColor: 'rgba(0,0,0,0.21)',
    borderRadius: horizontalScale(10),
    shadowColor: '#0000000',
    shadowOffset: {
      width: horizontalScale(0),
      height: verticalScale(2),
    },
    shadowOpacity: 0.5,
    shadowRadius: horizontalScale(8),
    elevation: horizontalScale(10),
  },
  modaltitle: {
    marginTop: verticalScale(15),
    paddingHorizontal: horizontalScale(15),
    paddingBottom: verticalScale(10),
  },
});

export default styles;
