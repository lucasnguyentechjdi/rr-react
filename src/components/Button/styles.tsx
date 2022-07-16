import {StyleSheet} from 'react-native';

import {BASE_COLORS, BASE_FONTS, BASE_STYLES} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  h1: {
    fontSize: adjust(BASE_STYLES.h1),
  },
  h2: {
    fontSize: adjust(BASE_STYLES.h2),
  },
  h3: {
    fontSize: adjust(BASE_STYLES.h3),
  },
  h4: {
    fontSize: adjust(BASE_STYLES.h4),
  },
  h5: {
    fontSize: adjust(BASE_STYLES.h5),
  },
  p: {
    fontSize: adjust(BASE_STYLES.p),
  },
  bold: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  textWhite: {
    color: BASE_COLORS.whiteColor,
  },
  textBlack: {
    color: BASE_COLORS.blackColor,
  },
  textTealBlue: {
    color: BASE_COLORS.tealBlueColor,
  },
  textGreyColor: {
    color: BASE_COLORS.greyColor,
  },
  textCenter: {
    textAlign: 'center',
  },
  containerCommonStyle: {
    paddingVertical: 8,
  },
  border: {
    borderColor: BASE_COLORS.gunmetalColor,
    borderWidth: 2,
  },
});
