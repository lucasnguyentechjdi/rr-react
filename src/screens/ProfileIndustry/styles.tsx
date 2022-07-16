import {Platform, StyleSheet} from 'react-native';

import {BASE_COLORS, GlobalStyles, BASE_STYLES, BASE_FONTS} from '~Root/config';
import {adjust, lineHeightByRatio} from '~Root/utils';

export default StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
  scrollViewWhite: {
    marginVertical: 0,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: BASE_COLORS.tealBlueColor,
    fontSize: adjust(10),
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomLeftRadius: adjust(14),
    borderBottomRightRadius: adjust(14),
    textTransform: 'uppercase',
  },
  userInfoContainer: {
    alignItems: 'center',
  },
  mainTextColor: {
    color: BASE_COLORS.steelBlueColor,
  },
  defaultTextColor: {
    color: BASE_COLORS.gunmetalColor,
  },
  description: {
    lineHeight: lineHeightByRatio(adjust(BASE_STYLES.h3 * 1.5)),
  },
  mainTitle: {
    color: BASE_COLORS.gunmetalColor,
    textAlign: 'center',
    ...GlobalStyles.mb10,
  },
  buttonContainer: {
    ...GlobalStyles.flexRow,
    ...GlobalStyles.mt30,
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonTextStyle: {
    ...GlobalStyles.mr10,
    color: BASE_COLORS.blackColor,
  },
  cardContainer: {
    flex: 1,
  },
  cardItemContainer: {
    ...GlobalStyles.mt20,
    alignItems: 'center',
    flex: 1,
  },
  subTitleStyle: {
    ...GlobalStyles.ml10,
  },
  cardSubTitleContainerStyle: {
    ...GlobalStyles.mt15,
  },
  cardTextRequiredStyle: {
    ...GlobalStyles.mt30,
    ...GlobalStyles.mr30,
    alignSelf: 'flex-end',
  },
  pageContainer: {
    paddingLeft: 53,
    paddingRight: 27,
  },
  scrollViewContentContainer: {
    paddingBottom: 80,
  },
  iconBackButton: {
    marginLeft: 22,
  },
  inputStyle: {
    ...GlobalStyles.pv15,
    borderWidth: 0,
    borderBottomColor: BASE_COLORS.whiteColor,
    borderBottomWidth: 1,
    color: BASE_COLORS.primary,
    fontSize: adjust(BASE_STYLES.h5),
    borderRadius: 0,
    flex: 1,
    height: Platform.OS === 'ios' ? 'auto' : adjust(46),
  },
  inputBorderStyle: {
    ...GlobalStyles.mt10,
    ...GlobalStyles.p10,
    borderColor: BASE_COLORS.blackColor,
    borderWidth: 1,
    color: BASE_COLORS.primary,
    fontSize: adjust(BASE_STYLES.h5),
    height: adjust(44),
  },
  inputErrorStyle: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: BASE_COLORS.redColor,
  },
  labelStyle: {
    fontFamily: BASE_FONTS.semiBold,
    fontSize: adjust(BASE_STYLES.h5),
    lineHeight: 24,
    color: BASE_COLORS.primary,
  },
  editProfileContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    flex: 1,
  },
  h2Custom: {
    ...GlobalStyles.h5,
    color: BASE_COLORS.secondary,
    fontWeight: '600',
    lineHeight: 32,
  },
  h1: {
    fontWeight: '600',
    lineHeight: 29,
    flex: 1,
  },
  h2: {
    flex: 1,
  },
  role: {
    lineHeight: 22,
    fontWeight: '600',
    width: '60%',
  },
  blocks: {
    marginBottom: 32,
    flexDirection: 'column',
  },
  blockHeader: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  subTitleContainer: {
    ...GlobalStyles.flexRow,
    ...GlobalStyles.mt30,
    alignItems: 'center',
  },
  tagSubTitle: {
    ...GlobalStyles.flexRow,
    ...GlobalStyles.mv10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  subTitle: {
    ...GlobalStyles.ml10,
    color: BASE_COLORS.gunmetalColor,
  },
  subTitleContainerStyle: {
    alignItems: 'center',
    marginBottom: 15,
  },
  mt12: {
    marginTop: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  inputContainer: {
    paddingTop: 12,
    paddingBottom: 15,
  },
  input: {
    ...GlobalStyles.h3,
    fontWeight: '600',
    lineHeight: 17,
  },
  textarea: {
    ...GlobalStyles.h3,
    lineHeight: 28,
    paddingTop: 6,
    paddingBottom: 8,
  },
  mainButtonContainer: {
    marginTop: 5,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonSecondContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 38,
    paddingRight: 38,
    marginTop: 26,
  },
  titleStyle: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.gunmetalColor,
    textAlign: 'center',
    width: '100%',
  },
  buttonContainerStyle: {
    ...GlobalStyles.mr10,
    alignSelf: 'center',
    backgroundColor: BASE_COLORS.spanishGrayColor,
    borderRadius: 24,
    paddingVertical: adjust(8),
    paddingHorizontal: adjust(25),
  },
  buttonPrimaryContainerStyle: {
    ...GlobalStyles.ml10,
    alignSelf: 'center',
    backgroundColor: BASE_COLORS.oxleyColor,
    borderRadius: 24,
    paddingVertical: adjust(8),
    paddingHorizontal: adjust(25),
  },
  information: {
    ...GlobalStyles.mb20,
    flex: 1,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
  },
  buttonGroup: {
    ...GlobalStyles.mv20,
    flex: 1,
    justifyContent: 'center',
  },
  h5BoldDefault: {
    ...GlobalStyles.h5,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.whiteColor,
  },
});
