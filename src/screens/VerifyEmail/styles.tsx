import {Platform, StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, GlobalStyles} from '~Root/config';
import {adjust} from '../../utils';

export default StyleSheet.create({
  headerContainer: {
    backgroundColor: BASE_COLORS.tealBlueColor,
  },
  header: {
    zIndex: 20,
    top: Platform.OS === 'ios' ? 55 : 30,
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
    ...GlobalStyles.h4,
    height: 44,
  },
  labelStyle: {
    ...GlobalStyles.h3,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
  },
  scrollViewContentContainer: {
    paddingBottom: 80,
  },
  buttonContainerStyle: {
    ...GlobalStyles.buttonContainerStyle,
    ...GlobalStyles.mb20,
    alignSelf: 'center',
    backgroundColor: BASE_COLORS.spanishGrayColor,
  },
  h3: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    marginBottom: 68,
  },
  h3Default: {
    ...GlobalStyles.h3,
    lineHeight: 32,
    color: BASE_COLORS.whiteColor,
  },
  h3BoldDefault: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.eerieBlackColor,
  },
  content: {
    flex: 1,
  },
  description: {
    ...GlobalStyles.mb30,
    flex: 0.3,
  },
  countDownContainer: {
    alignSelf: 'center',
    paddingHorizontal: adjust(20),
    paddingVertical: adjust(10),
    borderWidth: 1,
    borderColor: BASE_COLORS.tertiary,
    borderRadius: adjust(14),
  },
});
