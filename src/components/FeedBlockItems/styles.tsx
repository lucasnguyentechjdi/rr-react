import {StyleSheet} from 'react-native';

import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

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
  circleActive: {
    ...GlobalStyles.mb5,
    width: adjust(12),
    height: adjust(12),
    borderRadius: adjust(24),
    backgroundColor: BASE_COLORS.steelBlueColor,
  },
  circle: {
    ...GlobalStyles.mb5,
    width: adjust(12),
    height: adjust(12),
    borderRadius: adjust(24),
    backgroundColor: BASE_COLORS.gray90Color,
  },
});
