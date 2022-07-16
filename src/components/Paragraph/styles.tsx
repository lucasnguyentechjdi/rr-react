import { BASE_COLORS, BASE_FONTS, BASE_STYLES } from '~Root/config';

import { StyleSheet } from 'react-native';
import { adjust } from '~Root/utils';

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
    fontFamily: BASE_FONTS.bold,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  bold600: {
    fontFamily: BASE_FONTS.semiBold,
  },
  italic: {
    fontStyle: 'italic',
  },
  default: {
    fontFamily: BASE_FONTS.regular,
    color: BASE_COLORS.davysGreyColor,
  },
  textPrimary: {
    color: BASE_COLORS.primary,
  },
  textWhite: {
    color: BASE_COLORS.whiteColor,
  },
  textBlack: {
    color: BASE_COLORS.blackColor,
  },
  textGray: {
    color: BASE_COLORS.gray,
  },
  textTealBlue: {
    color: BASE_COLORS.tealBlueColor,
  },
  textGreyColor: {
    color: BASE_COLORS.greyColor,
  },
  textOxleyColor: {
    color: BASE_COLORS.oxleyColor,
  },
  textSteelBlueColor: {
    color: BASE_COLORS.steelBlueColor,
  },
  textIndianRedColor: {
    color: BASE_COLORS.indianRedColor,
  },
  textEerieBlackColor: {
    color: BASE_COLORS.eerieBlackColor,
  },
  textSpanishGrayColor: {
    color: BASE_COLORS.spanishGrayColor,
  },
  textTimberWolfColor: {
    color: BASE_COLORS.timberWolfColor,
  },
  textCenter: {
    textAlign: 'center',
  },
});
