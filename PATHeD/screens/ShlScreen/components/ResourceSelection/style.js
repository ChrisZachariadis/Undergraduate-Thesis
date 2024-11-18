import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../../../assets/styles/scaling';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    marginHorizontal: horizontalScale(15),
  },
  searchContainer: {
    marginHorizontal: horizontalScale(10),
    marginBottom: verticalScale(10),
  },
  searchInputText: {
    width: '100%',
  },
  searchInput: {
    width: '50%',
    height: verticalScale(35),
    marginLeft: horizontalScale(10),
    paddingHorizontal: horizontalScale(10),
    borderWidth: scaleFontSize(1),
    borderRadius: scaleFontSize(15),
    borderColor: 'rgba(0, 0, 0, 0.3)',
    backgroundColor: 'white',
  },
  flatList: {
    shadowColor: '#000000',
    marginLeft: horizontalScale(20),
    marginRight: horizontalScale(10),
    height: verticalScale(410),
  },
  flatListConfirm: {
    height: verticalScale(480),
  },
  backButton: {
    width: horizontalScale(120),
    backgroundColor: 'grey',
  },
  backButtonDisabled: {
    width: horizontalScale(120),
    backgroundColor: 'white',
  },
  continueButton: {
    width: horizontalScale(120),
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: verticalScale(10),
    marginHorizontal: horizontalScale(20),
  },
});

export default styles;
