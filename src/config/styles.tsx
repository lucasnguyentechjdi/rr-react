import {BASE_COLORS, BASE_FONTS, BASE_STYLES} from './theme';
import {Dimensions, PixelRatio, Platform, StyleSheet} from 'react-native';
import {adjust, buttonPositionByRatio} from '~Root/utils';
import {headerTop, heightByRatio, lineHeightByRatio} from '~Root/utils/functions';

import {HEADER} from '.';

export const ratioButton = buttonPositionByRatio();

export const GlobalStyles = StyleSheet.create({
  h1: {
    fontFamily: BASE_FONTS.semiBold,
    fontSize: adjust(BASE_STYLES.h1),
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: lineHeightByRatio(29),
    color: BASE_COLORS.whiteColor,
  },
  h2: {
    fontFamily: BASE_FONTS.regular,
    fontSize: adjust(BASE_STYLES.h2),
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: lineHeightByRatio(28),
    color: BASE_COLORS.whiteColor,
  },
  h3: {
    fontFamily: BASE_FONTS.regular,
    fontSize: adjust(BASE_STYLES.h3),
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: lineHeightByRatio(24),
    // color: BASE_COLORS.whiteColor,
  },
  h3Title: {
    marginBottom: 68,
    fontWeight: '600',
    fontFamily: BASE_FONTS.semiBold,
  },
  h4: {
    fontFamily: BASE_FONTS.regular,
    fontSize: adjust(BASE_STYLES.h4),
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: BASE_COLORS.whiteColor,
  },
  h5: {
    fontFamily: BASE_FONTS.regular,
    fontSize: adjust(BASE_STYLES.h5),
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: BASE_COLORS.whiteColor,
  },
  p: {
    fontFamily: BASE_FONTS.regular,
    fontSize: adjust(BASE_STYLES.p),
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: BASE_COLORS.whiteColor,
  },
  inlineText: {
    fontFamily: BASE_FONTS.regular,
    fontSize: adjust(BASE_STYLES.p),
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: BASE_COLORS.whiteColor,
    display: 'flex',
  },
  textUppercase: {
    textTransform: 'uppercase',
  },
  containerBg: {
    flex: 1,
    backgroundColor: BASE_COLORS.primary,
  },
  container: {
    flex: 1,
  },
  headerNew: {
    height: (Dimensions.get('window').height / 100) * 25, //old num: 30
  },
  headerNewWithContent: {
    height: (Dimensions.get('window').height / 100) * 25 + 30, //old num: 30
  },
  containerHeader: {
    // flex: PixelRatio.get() < 2 ? (Platform.OS === 'ios' ? 1 : 0.4) : -1,
    borderBottomRightRadius: PixelRatio.roundToNearestPixel(80),
  },
  containerHeaderNew: {
    borderBottomRightRadius: PixelRatio.roundToNearestPixel(80),
  },
  containerHeaderXS: {
    borderBottomRightRadius: PixelRatio.roundToNearestPixel(24),
    borderBottomLeftRadius: PixelRatio.roundToNearestPixel(24),
  },
  containerHeaderWhiteSM: {
    height: HEADER.Header.SM,
    // height: PixelRatio.roundToNearestPixel(HEADER.Header.SM),
    backgroundColor: BASE_COLORS.whiteColor,
    alignItems: 'center',
    paddingHorizontal: PixelRatio.roundToNearestPixel(15),
  },
  containerHeaderBlueXSSM: {
    height: HEADER.Header.EXS,
    // height: PixelRatio.roundToNearestPixel(HEADER.Header.EXS),
    backgroundColor: BASE_COLORS.steelBlue,
  },
  containerHeaderBlueSM: {
    height: HEADER.Header.SM,
    // height: PixelRatio.roundToNearestPixel(HEADER.Header.SM),
    backgroundColor: BASE_COLORS.steelBlue,
    paddingHorizontal: PixelRatio.roundToNearestPixel(15),
  },
  containerHeaderBlueMD: {
    height: HEADER.Header.MD,
    // height: PixelRatio.roundToNearestPixel(HEADER.Header.MD),
    backgroundColor: BASE_COLORS.steelBlue,
  },
  containerHeaderLightBlue: {
    height: HEADER.Header.MD + 30,
    // height: PixelRatio.roundToNearestPixel(HEADER.Header.MD),
    backgroundColor: BASE_COLORS.lightBlue,
  },
  containerHeaderBlueNew: {
    backgroundColor: BASE_COLORS.steelBlue,
  },
  containerHeaderBlueBig: {
    height: HEADER.Header.LG,
    // height: PixelRatio.roundToNearestPixel(HEADER.Header.LG),
    backgroundColor: BASE_COLORS.steelBlue,
  },
  containerTealBlue: {
    flex: 1,
    backgroundColor: BASE_COLORS.steelBlue,
  },
  containerWhite: {
    flex: 1,
    backgroundColor: BASE_COLORS.whiteColor,
  },
  containerGray: {
    flex: 1,
    backgroundColor: BASE_COLORS.gray90Color,
  },
  safeAreaView: {
    flex: 1,
  },
  borderBottom: {
    borderBottomWidth: 1,
  },
  fullWidth: {
    width: '100%',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  headerJustifyBetween: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  headerSmallWhiteContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: BASE_COLORS.tealBlueColor,
    marginTop: PixelRatio.get() < 2 ? '-10%' : 0,
  },
  headerSmallBlueContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: BASE_COLORS.whiteColor,
  },
  itemCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: PixelRatio.get() < 2 ? 20 : 0,
  },
  headerArea: {
    zIndex: 10,
    position: 'absolute',
    top: 0,
  },
  scrollView: {
    marginTop: 20,
    paddingTop: 20,
    flex: 1,
  },
  scrollViewTealBlue: {
    backgroundColor: BASE_COLORS.tealBlueColor,
    zIndex: -1,
    marginHorizontal: 30,
    marginVertical: 20,
    flex: 1,
  },
  scrollViewWhite: {
    backgroundColor: BASE_COLORS.whiteColor,
    zIndex: -1,
    marginHorizontal: adjust(20),
    marginVertical: adjust(20),
  },
  scrollViewContentContainer: {
    paddingBottom: adjust(10),
  },
  scrollViewFullScreen: {
    flexGrow: 1,
  },
  avatarContainer: {
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatarContainerSecond: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniAvatar: {
    borderRadius: adjust(30),
    width: adjust(60),
    height: adjust(60),
  },
  avatarColor: {
    width: adjust(80),
    height: adjust(80),
    backgroundColor: '#00000033',
  },
  avatar: {
    borderRadius: adjust(160),
    width: adjust(80),
    height: adjust(80),
  },
  avatar1: {
    width: adjust(110),
    height: adjust(110),
    borderRadius: adjust(220),
  },
  avatar2: {
    width: adjust(60),
    height: adjust(60),
    borderRadius: adjust(120),
  },
  tagStyleContainer: {
    borderRadius: 10,
    backgroundColor: BASE_COLORS.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  tagStyle: {
    color: BASE_COLORS.whiteColor,
    textTransform: 'capitalize',
  },
  askTagStyleContainer: {
    backgroundColor: BASE_COLORS.aeroColor,
  },
  askTagStyle: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.eerieBlackColor,
  },
  textNormal: {
    fontFamily: BASE_FONTS.regular,
    fontWeight: '500',
    fontSize: BASE_STYLES.h5,
    lineHeight: 24,
    color: BASE_COLORS.lightBlackColor,
  },
  textBlue: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    fontSize: BASE_STYLES.h5,
    lineHeight: 24,
    color: BASE_COLORS.primary,
  },
  textSteelBlue: {
    fontFamily: BASE_FONTS.regular,
    fontSize: adjust(BASE_STYLES.h5),
    color: BASE_COLORS.steelBlueColor,
  },
  textBold: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    fontSize: BASE_STYLES.h5,
    lineHeight: 24,
  },
  keyboard: {
    flex: 1,
  },
  header: {
    zIndex: 20,
    top: headerTop(),
    width: '100%',
  },
  headerEXS: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextBlue: {
    color: BASE_COLORS.tealBlueColor,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  headerTextWhite: {
    color: BASE_COLORS.whiteColor,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  headerTextBlack: {
    color: BASE_COLORS.blackColor,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  buttonContainerStyle: {
    paddingHorizontal: adjust(31),
    paddingVertical: adjust(14),
  },
  m5: {
    margin: adjust(5),
  },
  mb0: {
    marginBottom: 0,
  },
  mb5: {
    marginBottom: adjust(5),
  },
  mb10: {
    marginBottom: adjust(10),
  },
  mb15: {
    marginBottom: adjust(15),
  },
  mb20: {
    marginBottom: adjust(20),
  },
  mb30: {
    marginBottom: adjust(30),
  },
  mb38: {
    marginBottom: adjust(38),
  },
  mb40: {
    marginBottom: adjust(40),
  },
  mb45: {
    marginBottom: adjust(45),
  },
  mb50: {
    marginBottom: adjust(50),
  },
  mb55: {
    marginBottom: adjust(55),
  },
  mb60: {
    marginBottom: adjust(60),
  },
  mb65: {
    marginBottom: adjust(65),
  },
  ml5: {
    marginLeft: adjust(5),
  },
  ml30: {
    marginLeft: adjust(30),
  },
  ml20: {
    marginLeft: adjust(20),
  },
  ml15: {
    marginLeft: adjust(15),
  },
  ml10: {
    marginLeft: adjust(10),
  },
  mr5: {
    marginRight: adjust(5),
  },
  mr10: {
    marginRight: adjust(10),
  },
  mr15: {
    marginRight: adjust(15),
  },
  mr20: {
    marginRight: adjust(20),
  },
  mr25: {
    marginRight: adjust(25),
  },
  mr30: {
    marginRight: adjust(30),
  },
  mt5: {
    marginTop: adjust(5),
  },
  mt10: {
    marginTop: adjust(10),
  },
  mt15: {
    marginTop: adjust(15),
  },
  mt20: {
    marginTop: adjust(20),
  },
  mt25: {
    marginTop: adjust(25),
  },
  mt30: {
    marginTop: adjust(30),
  },
  mt35: {
    marginTop: adjust(35),
  },
  mt46: {
    marginTop: adjust(46),
  },
  mv5: {
    marginVertical: adjust(5),
  },
  mv10: {
    marginVertical: adjust(10),
  },
  mv15: {
    marginVertical: adjust(15),
  },
  mv20: {
    marginVertical: adjust(20),
  },
  mh5: {
    marginHorizontal: adjust(5),
  },
  mh10: {
    marginHorizontal: adjust(10),
  },
  mh15: {
    marginHorizontal: adjust(15),
  },
  mh20: {
    marginHorizontal: adjust(20),
  },
  mh30: {
    marginHorizontal: adjust(30),
  },
  p5: {
    padding: adjust(5),
  },
  p10: {
    padding: adjust(10),
  },
  p15: {
    padding: adjust(15),
  },
  p20: {
    padding: adjust(20),
  },
  p25: {
    padding: adjust(25),
  },
  p30: {
    padding: adjust(30),
  },
  ph5: {
    paddingLeft: adjust(5),
    paddingRight: adjust(5),
  },
  ph8: {
    paddingLeft: adjust(8),
    paddingRight: adjust(8),
  },
  ph10: {
    paddingLeft: adjust(10),
    paddingRight: adjust(10),
  },
  ph15: {
    paddingLeft: adjust(15),
    paddingRight: adjust(15),
  },
  ph20: {
    paddingLeft: adjust(20),
    paddingRight: adjust(20),
  },
  ph23: {
    paddingLeft: adjust(23),
    paddingRight: adjust(23),
  },
  ph25: {
    paddingLeft: adjust(25),
    paddingRight: adjust(25),
  },
  ph30: {
    paddingLeft: adjust(30),
    paddingRight: adjust(30),
  },
  ph35: {
    paddingLeft: adjust(35),
    paddingRight: adjust(35),
  },
  ph40: {
    paddingLeft: adjust(40),
    paddingRight: adjust(40),
  },
  pv2: {
    paddingTop: adjust(2),
    paddingBottom: adjust(2),
  },
  pv5: {
    paddingTop: adjust(5),
    paddingBottom: adjust(5),
  },
  pv8: {
    paddingTop: adjust(8),
    paddingBottom: adjust(8),
  },
  pv10: {
    paddingTop: adjust(10),
    paddingBottom: adjust(10),
  },
  pv15: {
    paddingTop: adjust(15),
    paddingBottom: adjust(15),
  },
  pv20: {
    paddingTop: adjust(20),
    paddingBottom: adjust(20),
  },
  pv30: {
    paddingTop: adjust(30),
    paddingBottom: adjust(30),
  },
  pv45: {
    paddingTop: adjust(45),
    paddingBottom: adjust(45),
  },
  pt5: {
    paddingTop: adjust(5),
  },
  pt10: {
    paddingTop: adjust(10),
  },
  pt15: {
    paddingTop: adjust(15),
  },
  pt20: {
    paddingTop: adjust(20),
  },
  pt25: {
    paddingTop: adjust(25),
  },
  pt30: {
    paddingTop: adjust(30),
  },
  pt35: {
    paddingTop: adjust(35),
  },
  pt40: {
    paddingTop: adjust(40),
  },
  pb0: {
    paddingBottom: 0,
  },
  pb5: {
    paddingBottom: adjust(5),
  },
  pb10: {
    paddingBottom: adjust(10),
  },
  pb15: {
    paddingBottom: adjust(15),
  },
  pb20: {
    paddingBottom: adjust(20),
  },
  pb25: {
    paddingBottom: adjust(25),
  },
  pb30: {
    paddingBottom: adjust(30),
  },
  pb80: {
    paddingBottom: adjust(80),
  },
  pb150: {
    paddingBottom: adjust(150),
  },
  pr5: {
    paddingRight: adjust(5),
  },
  pl5: {
    paddingLeft: adjust(5),
  },
  pl10: {
    paddingLeft: adjust(10),
  },
  pl15: {
    paddingLeft: adjust(15),
  },
  pl20: {
    paddingLeft: adjust(20),
  },
  pl25: {
    paddingLeft: adjust(25),
  },
  pl30: {
    paddingLeft: adjust(30),
  },
  pl80: {
    paddingLeft: adjust(80),
  },
  pl150: {
    paddingLeft: adjust(150),
  },
  iconBackContainer: {
    alignSelf: 'flex-start',
  },
  iconBack: {
    width: adjust(14),
    height: adjust(24),
  },
  inputStyle: {
    height: adjust(48),
  },
  labelStyle: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: adjust(18),
  },
  mainButtonContainer: {
    position: 'absolute',
    bottom: ratioButton?.bottom,
    right: adjust(20),
  },
  mainButtonArea: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: adjust(28),
    backgroundColor: BASE_COLORS.oxleyColor,
  },
  mainButtonAreaSteelBlue: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: adjust(28),
    backgroundColor: BASE_COLORS.steelBlueColor,
    alignSelf: 'center',
  },
  mainButtonTextStyle: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    lineHeight: adjust(32),
  },
  /** Phone Input */
  phoneCountryStyle: {
    borderTopRightRadius: adjust(20),
    borderBottomRightRadius: adjust(20),
    borderColor: BASE_COLORS.oxleyColor,
  },
  phoneContainerStyle: {
    height: heightByRatio(48),
    borderWidth: 1,
    borderRadius: 20,
    borderColor: BASE_COLORS.oxleyColor,
    flex: 1,
    paddingHorizontal: 0,
  },
  phoneTextContainerStyle: {
    backgroundColor: BASE_COLORS.whiteColor,
    marginRight: 15,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  phoneContainerErrorStyle: {
    height: heightByRatio(48),
    borderWidth: 1,
    borderRadius: 20,
    borderColor: BASE_COLORS.redColor,
    flex: 1,
    paddingHorizontal: 0,
  },
  phoneTextInputStyle: {
    fontFamily: BASE_FONTS.regular,
    fontSize: adjust(BASE_STYLES.h4),
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: BASE_COLORS.steelBlueColor,
    padding: 0,
  },
  phoneCodeTextInputStyle: {
    fontFamily: BASE_FONTS.regular,
    fontSize: adjust(BASE_STYLES.h4),
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: BASE_COLORS.steelBlueColor,
  },
  /** End Phone Input */
  blockGrey: {
    backgroundColor: BASE_COLORS.gray90Color,
    borderRadius: 24,
  },
  /** Modal */
  styleModalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  styleModal: {
    flex: 0.3,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  styleModalSecond: {
    flex: 0.4,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: adjust(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textRevokeInviteHighlight: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.eerieBlackColor,
  },
  textTealBlueHighlight: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.tealBlueColor,
  },
  textRevokeInvite: {
    color: BASE_COLORS.eerieBlackColor,
  },
  /** End Modal */
  containerHeaderStyle: {
    paddingHorizontal: adjust(10),
    overflow: 'hidden',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignBaseline: {
    alignSelf: 'baseline',
  },
  relativeBlock: {
    position: 'relative',
  },
  textJustify: {
    textAlign: 'justify',
  },
  logo: {
    width: adjust(80),
    height: adjust(80),
  },
});

/**
 * Common basic style defines
 */
export const BaseStyle = StyleSheet.create({
  textInput: {
    height: 46,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  safeAreaView: {
    flex: 1,
  },
});
