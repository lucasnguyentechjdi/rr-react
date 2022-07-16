import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';
import {adjust, lineHeightByRatio} from '~Root/utils';

import {StyleSheet} from 'react-native';

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
  headerText: {
    color: BASE_COLORS.tealBlueColor,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    fontSize: 12,
  },
  inputStyle: {
    ...GlobalStyles.h5,
    ...GlobalStyles.inputStyle,
    borderColor: BASE_COLORS.blackColor,
    borderRadius: adjust(20),
    color: BASE_COLORS.blackColor,
  },
  labelStyle: {
    ...GlobalStyles.h3,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: 'bold',
    marginBottom: 8,
    color: BASE_COLORS.blackColor,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    marginBottom: adjust(90),
  },
  scrollView: {
    backgroundColor: BASE_COLORS.tealBlueColor,
    zIndex: -1,
    marginHorizontal: 30,
  },
  scrollViewContentContainer: {
    paddingBottom: 80,
  },
  buttonContainerStyle: {
    alignSelf: 'center',
    marginTop: 95,
    width: '70%',
  },
  h3Default: {
    lineHeight: lineHeightByRatio(adjust(BASE_STYLES.h3)),
  },
  h3BoldDefault: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: 'bold',
    color: BASE_COLORS.whiteColor,
  },
  signUpLink: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: 'bold',
    marginLeft: 5,
    color: BASE_COLORS.steelBlueColor,
  },
  textRed: {
    color: BASE_COLORS.giantsOrangeColor,
    marginRight: 3,
  },
  avatarContainer: {
    position: 'absolute',
  },
});
