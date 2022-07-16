import {StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, GlobalStyles} from '~Root/config';
import {adjust} from '../../utils';

export default StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
  scrollViewWhite: {
    marginVertical: 0,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    ...GlobalStyles.pv10,
    ...GlobalStyles.ph20,
    fontSize: adjust(10),
    backgroundColor: BASE_COLORS.tealBlueColor,
    borderBottomLeftRadius: adjust(14),
    borderBottomRightRadius: adjust(14),
    textTransform: 'uppercase',
  },
  headerText: {
    color: BASE_COLORS.tealBlueColor,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    fontSize: adjust(12),
  },
  styleArea: {
    flex: 1,
    justifyContent: 'center',
  },
  inputStyle: {
    ...GlobalStyles.h5,
    ...GlobalStyles.mb15,
    height: adjust(44),
    borderBottomColor: BASE_COLORS.blackColor,
    borderBottomWidth: 1,
    borderRadius: 0,
    color: BASE_COLORS.blackColor,
    textAlign: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  textAreaStyle: {
    ...GlobalStyles.h5,
    ...GlobalStyles.mb15,
    borderColor: BASE_COLORS.blackColor,
    borderWidth: 1,
    color: BASE_COLORS.blackColor,
    textAlign: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  labelStyle: {
    ...GlobalStyles.h3,
    ...GlobalStyles.mb10,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: 'bold',
  },
  scrollViewContentContainer: {
    ...GlobalStyles.pb80,
  },
  buttonGroup: {
    ...GlobalStyles.mb38,
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainerStyle: {
    ...GlobalStyles.mr10,
    alignSelf: 'center',
    backgroundColor: BASE_COLORS.spanishGrayColor,
    borderRadius: adjust(24),
    paddingVertical: adjust(8),
    paddingHorizontal: adjust(25),
  },
  buttonPrimaryContainerStyle: {
    ...GlobalStyles.ml10,
    alignSelf: 'center',
    backgroundColor: BASE_COLORS.oxleyColor,
    borderRadius: adjust(24),
    paddingVertical: adjust(8),
    paddingHorizontal: adjust(25),
  },
  h3: {
    ...GlobalStyles.mb65,
  },
  h3Default: {
    ...GlobalStyles.h3,
    lineHeight: adjust(32),
    color: BASE_COLORS.whiteColor,
  },
  h5BoldDefault: {
    ...GlobalStyles.h5,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.whiteColor,
  },
  information: {
    ...GlobalStyles.mb20,
    flex: 1,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
  },
});
