import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';
import {PixelRatio, StyleSheet} from 'react-native';
import {adjust, lineHeightByRatio} from '~Root/utils';

export default StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
  headerContainer: {
    backgroundColor: BASE_COLORS.tealBlueColor,
  },
  header: {
    zIndex: 20,
    top: 55,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    ...GlobalStyles.ph15,
  },
  h4Normal: {
    marginBottom: 68,
    textAlign: 'center',
    lineHeight: lineHeightByRatio(25),
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
    marginTop: PixelRatio.get() < 2 ? 0 : 30,
    paddingHorizontal: adjust(42),
  },
  link: {
    justifyContent: 'center',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: adjust(111),
    backgroundColor: '#C4C4C499',
    borderRadius: 18,
    paddingVertical: adjust(22),
    paddingHorizontal: adjust(22),
    display: 'flex',
  },
  buttonContainerStyle: {
    alignSelf: 'center',
    backgroundColor: BASE_COLORS.oxleyColor,
    marginTop: adjust(30),
  },
  h3BoldDefault: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    lineHeight: lineHeightByRatio(adjust(BASE_STYLES.h3)),
    display: 'flex',
  },
});
