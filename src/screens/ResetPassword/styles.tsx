import {BASE_COLORS, BASE_FONTS, GlobalStyles} from '~Root/config';

import {StyleSheet} from 'react-native';
import {adjust} from '~Root/utils';

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
    ...GlobalStyles.labelStyle,
    color: BASE_COLORS.blackColor,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
  },
  buttonContainerStyle: {
    alignSelf: 'center',
    marginTop: 40,
    width: '80%',
  },
  h3Default: {
    ...GlobalStyles.h3,
    lineHeight: 32,
    color: BASE_COLORS.whiteColor,
  },
  h3BoldDefault: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: 'bold',
    color: BASE_COLORS.whiteColor,
  },
  text: {
    color: BASE_COLORS.buffColor,
    textAlign: 'center',
    flex: 1,
  },
});
