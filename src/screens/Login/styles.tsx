import {StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';
import {adjust, lineHeightByRatio} from '~Root/utils';

export default StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
  inputStyle: {
    ...GlobalStyles.h4,
    ...GlobalStyles.inputStyle,
    borderColor: BASE_COLORS.blackColor,
    borderRadius: adjust(20),
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
    lineHeight: lineHeightByRatio(adjust(BASE_STYLES.h3)),
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
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: 'bold',
    marginLeft: 5,
    color: BASE_COLORS.steelBlueColor,
  },
});
