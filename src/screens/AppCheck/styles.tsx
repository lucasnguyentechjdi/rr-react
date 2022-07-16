import {StyleSheet, Dimensions} from 'react-native';
import {BASE_COLORS} from '~Root/config';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: height,
    width: width,
    resizeMode: 'cover',
  },
  waitingContainer: {
    backgroundColor: BASE_COLORS.whiteColor,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
});
