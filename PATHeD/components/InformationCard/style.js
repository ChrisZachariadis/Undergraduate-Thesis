import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';

const styles = StyleSheet.create({
  informationCardContainer: {
    paddingBottom: verticalScale(10),
    borderRadius: scaleFontSize(10),
    marginHorizontal: horizontalScale(8),
    shadowOffset: {width: 1, height: 4, borderRadius: 20},
    shadowColor: 'rgba(212, 212, 212)',
    shadowOpacity: 0.75,
    elevation: 5,
    backgroundColor: '#FFFFFF',
  },
  container: {
    height: verticalScale(80),
    borderRadius: horizontalScale(15),
    paddingHorizontal: horizontalScale(10),
    shadowColor: '#D4D4D4',
    shadowOpacity: '25%',
  },
  risk_Container: {
    height: verticalScale(20),
    width: horizontalScale(70),
    borderRadius: horizontalScale(5),
  },
  risk_Caption: {
    fontWeight: '400',
    fontSize: scaleFontSize(12),
    lineHeight: scaleFontSize(15),
    color: 'rgba(0,0,0,0.87)',
  },
  marginTop5: {
    marginTop: verticalScale(5),
  },
  marginTopMinus10: {
    marginTop: verticalScale(-15),
  },
  status_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cirlce: {
    marginRight: horizontalScale(5),
    color: 'green',
  },
  horizontalLine: {
    borderBottomColor: '#D4D4D4',
    borderBottomWidth: 1,
  },
});

export default styles;
