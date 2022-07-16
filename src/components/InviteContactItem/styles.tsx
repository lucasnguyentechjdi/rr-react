import {StyleSheet} from 'react-native';
import {BASE_COLORS} from '~Root/config';

export default StyleSheet.create({
  contain: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 15,
    flex: 1,
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: BASE_COLORS.whiteColor,
  },
  itemContainer: {
    flex: 1,
  },
});
