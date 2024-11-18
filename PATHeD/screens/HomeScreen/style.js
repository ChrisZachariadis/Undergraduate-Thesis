import {StyleSheet} from 'react-native';
import {verticalScale} from '../../assets/styles/scaling';

const myHealthDashboardStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingBottom: verticalScale(20),
  },
  ProfileContainer: {
    position: 'absolute',
    top: 13,
    right: 13,
  },
  ImageContainer: {
    justifyContent: 'center',
  },
  ImageStyle: {
    width: 35,
    height: 35,
  },
  ImageInitials: {
    position: 'absolute',
    alignSelf: 'center',
    color: '#00827B',
  },
});

export default myHealthDashboardStyle;
