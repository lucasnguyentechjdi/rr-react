import {Platform, StyleSheet} from 'react-native';

import {BASE_COLORS, BASE_FONTS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

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
  scrollView: {
    flex: 1,
  },
  headerText: {
    color: BASE_COLORS.tealBlueColor,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    fontSize: 12,
  },
  inputStyle: {
    ...GlobalStyles.h4,
    ...GlobalStyles.inputStyle,
    borderColor: BASE_COLORS.oxleyColor,
    borderRadius: 20,
    color: BASE_COLORS.steelBlueColor,
  },
  labelStyle: {
    ...GlobalStyles.h4,
    color: BASE_COLORS.steelBlueColor,
  },
  scrollViewContentContainer: {
    paddingBottom: 80,
  },
  buttonContainerStyle: {
    borderRadius: adjust(28),
    backgroundColor: BASE_COLORS.spanishGrayColor,
  },
  buttonCreateInviteContainerStyle: {
    borderRadius: adjust(28),
    backgroundColor: '#679C79',
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
    lineHeight: 32,
    color: BASE_COLORS.whiteColor,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  description: {
    color: BASE_COLORS.steelBlueColor,
    width: '70%',
    alignSelf: 'center',
  },
  contactContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  link: {
    color: BASE_COLORS.steelBlueColor,
    textAlign: 'center',
    marginBottom: 20,
  },
  countryStyle: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: BASE_COLORS.oxleyColor,
  },
  textError: {
    color: BASE_COLORS.redColor,
    marginTop: 10,
  },
  linkMore: {
    color: BASE_COLORS.blackColor,
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20,
  },
  line: {
    backgroundColor: '#679C79',
    width: '100%',
    height: adjust(1),
  }
});
