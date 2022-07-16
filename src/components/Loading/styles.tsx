import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 2000,
  },
  bgBlur: {
    backgroundColor: '#000000',
    opacity: 0.6,
    height: height,
  },
  logo: {
    height: height,
    width: width,
    resizeMode: 'cover',
  },
  waitingContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
  },
});
