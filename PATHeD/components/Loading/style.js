import {StyleSheet} from 'react-native';
import {scaleFontSize} from '../../assets/styles/scaling';

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: scaleFontSize(20),
    fontSize: scaleFontSize(22),
    fontWeight: '600',
    lineHeight: scaleFontSize(27),
    fontFamily: 'Inter',
    color: '#0B3F6B',
  },
});

export default styles;
