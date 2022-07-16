import { BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles } from '~Root/config';
import { PixelRatio, StyleSheet } from 'react-native';
import { adjust, lineHeightByRatio, paddingByRatio } from '~Root/utils';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: adjust(20),
  },
  listItemContainer: {
    width: '100%',
    paddingHorizontal: paddingByRatio(10),
    marginTop: 10,
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  modal: {
    ...GlobalStyles.ph15,
    ...GlobalStyles.pb0,
    backgroundColor: BASE_COLORS.whiteColor,
    borderRadius: 48,
    flex: 0.4,
  },
  title: {
    ...GlobalStyles.mt30,
    fontFamily: BASE_FONTS.semiBold,
    lineHeight: lineHeightByRatio(22),
    fontWeight: '600',
    color: BASE_COLORS.gunmetalColor,
  },
  buttonContainer: {
    backgroundColor: BASE_COLORS.oxleyColor,
    borderRadius: 25,
  },
  contentContainer: {
    ...GlobalStyles.mt30,
    flex: 1,
  },
  styleContent: {
    textAlign: 'center',
  },
  btnStyle: {
    ...GlobalStyles.buttonContainerStyle,
    alignSelf: 'center',
    backgroundColor: BASE_COLORS.oxleyColor,
    borderRadius: 25,
  },
  h3BoldDefault: {
    ...GlobalStyles.h3,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    lineHeight: lineHeightByRatio(adjust(BASE_STYLES.h3)),
    color: BASE_COLORS.whiteColor,
  },
});
