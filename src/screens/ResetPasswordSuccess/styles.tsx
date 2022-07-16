import {BASE_COLORS, BASE_FONTS, BASE_STYLES} from '~Root/config';
import {adjust, lineHeightByRatio} from '~Root/utils';

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  containerFull: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: adjust(42),
  },
  buttonContainerStyle: {
    alignSelf: 'center',
    backgroundColor: BASE_COLORS.oxleyColor,
    marginTop: adjust(90),
  },
  h3BoldDefault: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    lineHeight: lineHeightByRatio(adjust(BASE_STYLES.h3)),
    color: BASE_COLORS.whiteColor,
  },
});
