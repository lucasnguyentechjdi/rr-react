import {StyleSheet} from 'react-native';

import {BASE_COLORS, GlobalStyles} from '~Root/config';

export default StyleSheet.create({
  listContainer: {
    ...GlobalStyles.pt10,
    ...GlobalStyles.pb150,
  },
  iconContainer: {
    ...GlobalStyles.pv15,
    ...GlobalStyles.ph20,
    ...GlobalStyles.mr10,
    borderRadius: 100,
    backgroundColor: BASE_COLORS.davysGreyColor,
  },
  textStyle: {
    textAlign: 'center',
  },
});
