import { BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles } from '~Root/config';
import { Platform, StyleSheet } from 'react-native';
import { adjust, lineHeightByRatio } from '~Root/utils';

export default StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
  headerContainer: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
  headerContainerRatio: {
    marginTop: adjust(-30),
  },
  headerContent: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  headerWrapper: {
    alignItems: 'center',
  },
  userInfoContainer: {
    alignItems: 'center',
    ...GlobalStyles.mt20,
  },
  mainTextColor: {
    color: BASE_COLORS.steelBlueColor,
  },
  defaultTextColor: {
    color: BASE_COLORS.gunmetalColor,
  },
  email: {
    color: BASE_COLORS.spanishGrayColor,
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
    ...GlobalStyles.ph20,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: adjust(20),
  },
  buttonTextStyle: {
    ...GlobalStyles.mr10,
    color: BASE_COLORS.blackColor,
  },
  buttonEditContainer: {
    ...GlobalStyles.mt15,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  cardContainer: {
    ...GlobalStyles.mt25,
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
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {
    ...GlobalStyles.pb5,
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
    fontSize: adjust(16)
  },
  styleArea: {
    flex: 1,
    justifyContent: 'center',
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
  inputBorderStyle: {
    ...GlobalStyles.mt10,
    borderColor: BASE_COLORS.blackColor,
    borderWidth: 1,
    padding: 12,
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
    lineHeight: adjust(24),
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
    lineHeight: adjust(32),
  },
  h1: {
    fontWeight: '600',
    lineHeight: adjust(29),
    flex: 1,
  },
  h2: {
    flex: 1,
  },
  role: {
    lineHeight: adjust(22),
    fontWeight: '600',
    width: '60%',
  },
  blocks: {
    ...GlobalStyles.mb30,
    flexDirection: 'column',
  },
  blockHeader: {
    ...GlobalStyles.mb5,
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
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
    ...GlobalStyles.mb15,
    alignItems: 'center',
  },
  mt12: {
    ...GlobalStyles.mt10,
  },
  tagContainer: {
    ...GlobalStyles.mb15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  inputContainer: {
    ...GlobalStyles.pt10,
    ...GlobalStyles.pb15,
  },
  input: {
    ...GlobalStyles.h3,
    fontWeight: '600',
    lineHeight: adjust(17),
  },
  textarea: {
    ...GlobalStyles.h3,
    ...GlobalStyles.pt5,
    ...GlobalStyles.pb10,
    lineHeight: adjust(28),
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
    backgroundColor: BASE_COLORS.spanishGrayColor,
    borderRadius: 24,
    paddingVertical: adjust(10),
    paddingHorizontal: adjust(25),
  },
  buttonRemoveContainerStyle: {
    alignSelf: 'center',
    backgroundColor: BASE_COLORS.indianRedColor,
    borderRadius: 24,
    paddingVertical: adjust(10),
    paddingHorizontal: adjust(25),
  },
  buttonPrimaryContainerStyle: {
    backgroundColor: BASE_COLORS.oxleyColor,
    borderRadius: 24,
    paddingVertical: adjust(10),
    paddingHorizontal: adjust(25),
  },
  buttonGroup: {
    ...GlobalStyles.mt20,
    ...GlobalStyles.mb38,
  },
  h5BoldDefault: {
    ...GlobalStyles.h5,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.whiteColor,
  },
  textStyle: {
    ...GlobalStyles.h5,
    ...GlobalStyles.mainButtonTextStyle,
    textAlign: 'center',
  },
  mainButtonArea: {
    ...GlobalStyles.mainButtonArea,
  },
  cancelButtonArea: {
    ...GlobalStyles.mainButtonArea,
    ...GlobalStyles.mr10,
    backgroundColor: BASE_COLORS.indianRedColor,
  },
  buttonGroupModal: {
    ...GlobalStyles.flexRow,
    justifyContent: 'center',
  },
  item: {
    borderBottomColor: BASE_COLORS.lavenderGray,
    borderBottomWidth: 1,
    paddingVertical: adjust(15),
    paddingHorizontal: adjust(25),
  },
  informationSection: {
    backgroundColor: BASE_COLORS.greyBlue,
  },
  styleModal: {
    ...GlobalStyles.ph15,
    ...GlobalStyles.pt15,
    flex: 0.2,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  styleModalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  mainButtonTextStyle: {
    ...GlobalStyles.h5,
    ...GlobalStyles.mainButtonTextStyle,
    alignSelf: 'center',
  },
});
