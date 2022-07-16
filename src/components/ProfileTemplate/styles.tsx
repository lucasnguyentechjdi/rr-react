import {StyleSheet} from 'react-native';

import {BASE_COLORS, GlobalStyles} from '~Root/config';

export default StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
  scrollViewWhite: {
    marginVertical: 0,
  },
  imageButton: {
    ...GlobalStyles.pv15,
  },
});
