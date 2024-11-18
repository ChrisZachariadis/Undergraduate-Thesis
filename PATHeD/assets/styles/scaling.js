import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const horizontalScale = size => (size / width) * width;
const verticalScale = size => (size / height) * height;
const scaleFontSize = size => Math.round((size / width) * width);
export {horizontalScale, verticalScale, scaleFontSize};
