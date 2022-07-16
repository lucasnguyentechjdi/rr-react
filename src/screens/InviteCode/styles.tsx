import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';
import {adjust, lineHeightByRatio} from '~Root/utils';

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
  headerContainer: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
  header: {
    zIndex: 20,
    top: 55,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
  },
  headerText: {
    color: BASE_COLORS.tealBlueColor,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    fontSize: 12,
  },
  styleContainer: {
    flex: 1,
  },
  inputStyle: {
    ...GlobalStyles.h4,
    ...GlobalStyles.inputStyle,
    ...GlobalStyles.mt30,
    borderColor: BASE_COLORS.blackColor,
    borderRadius: 20,
    color: BASE_COLORS.blackColor,
  },
  labelStyle: {
    ...GlobalStyles.h3,
    ...GlobalStyles.labelStyle,
    color: BASE_COLORS.blackColor,
    textAlign: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainerStyle: {
    alignSelf: 'center',
    backgroundColor: BASE_COLORS.oxleyColor,
  },
  h3Default: {
    ...GlobalStyles.h3,
    lineHeight: 32,
    color: BASE_COLORS.whiteColor,
  },
  h3BoldDefault: {
    ...GlobalStyles.h3,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    lineHeight: lineHeightByRatio(adjust(BASE_STYLES.h3)),
    color: BASE_COLORS.whiteColor,
  },
  text: {
    color: BASE_COLORS.buffColor,
    textAlign: 'center',
    flex: 1,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
