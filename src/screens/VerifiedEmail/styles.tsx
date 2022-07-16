import {Platform, StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, GlobalStyles} from '~Root/config';

export default StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
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
    alignSelf: 'center',
    marginTop: 95,
    width: '70%',
    backgroundColor: BASE_COLORS.oxleyColor,
  },
  h3: {
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
    color: BASE_COLORS.whiteColor,
  },
  content: {
    flex: 1,
  },
  description: {
    flex: 0.3,
  },
});
