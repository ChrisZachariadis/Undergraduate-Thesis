import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../../../assets/styles/scaling';

const styles = StyleSheet.create({
  dropdown: {
    width: '45%',
    height: verticalScale(35),
    borderWidth: scaleFontSize(1),
    borderColor: 'rgba(0, 0, 0, 0.3)',
    backgroundColor: 'white',
    borderRadius: scaleFontSize(15),
    paddingHorizontal: verticalScale(10),
    elevation: 1,
  },
  item: {
    padding: horizontalScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default styles;
