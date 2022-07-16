import {BASE_COLORS} from '~Root/config';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  tabContainer: {
    height: 60,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.0,
    backgroundColor: 'white',
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20,
    elevation: 10,
    position: 'absolute',
    bottom: 0,
    display: 'flex',
  },
  slider: {
    height: 2,
    position: 'absolute',
    top: 0,
    left: 10,
    backgroundColor: BASE_COLORS.primary,
    borderRadius: 10,
    width: 50,
  },
  tabArea: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mt10: {
    marginTop: 10,
  },
  tabBarArea: {
    flex: 1,
    position: 'relative',
  },
  tabBarRow: {
    flexDirection: 'row',
  },
});

export default styles;
