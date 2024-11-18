import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';

const styles = StyleSheet.create({
  listItemContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: horizontalScale(7),
    paddingVertical: verticalScale(10),
    borderWidth: scaleFontSize(1),
    borderColor: '#e0e0e0',
    borderRadius: scaleFontSize(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: verticalScale(2)},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: scaleFontSize(18),
  },
  rightAction: {
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: horizontalScale(15),
  },
  flipCard: {
    width: horizontalScale(300),
    height: verticalScale(200),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    backfaceVisibility: 'hidden',
  },
});

export default styles;
