import { StyleSheet } from 'react-native';
import { BASE_COLORS, BASE_FONTS, GlobalStyles, BASE_STYLES } from '~Root/config';
import { adjust, lineHeightByRatio } from '~Root/utils';

export default StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
  headerContainer: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
  inputStyleWrapper: {
    borderColor: BASE_COLORS.blackColor,
    borderRadius: 20,
    color: BASE_COLORS.blackColor,
  },
  inputStyle: {
    ...GlobalStyles.h4,
    ...GlobalStyles.inputStyle,
    borderColor: BASE_COLORS.blackColor,
    borderRadius: 20,
    color: BASE_COLORS.blackColor,
  },
  labelStyle: {
    ...GlobalStyles.labelStyle,
    color: BASE_COLORS.blackColor,
  },
  buttonContainerStyle: {
    alignSelf: 'center',
    backgroundColor: BASE_COLORS.oxleyColor,
  },
  h3: {
    ...GlobalStyles.mb38,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    lineHeight: lineHeightByRatio(adjust(BASE_STYLES.h3)),
  },
  h3Default: {
    ...GlobalStyles.h3,
    lineHeight: adjust(32),
    color: BASE_COLORS.whiteColor,
  },
  h3BoldDefault: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    lineHeight: lineHeightByRatio(adjust(BASE_STYLES.h3)),
    color: BASE_COLORS.whiteColor,
  },
  signUpArea: {
    ...GlobalStyles.mt46,
  },
  signUpLink: {
    ...GlobalStyles.ml5,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: 'bold',
  },
  iconContainerStyle: {
    position: 'absolute',
    right: adjust(10),
    zIndex: 10,
  },
  cardContainer: {
    ...GlobalStyles.mb20,
    ...GlobalStyles.pv10,
    ...GlobalStyles.ph20,
    backgroundColor: 'rgba(196, 196, 196, 0.1)',
    borderRadius: adjust(22),
  },
  cardDescription: {
    ...GlobalStyles.mt10,
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
