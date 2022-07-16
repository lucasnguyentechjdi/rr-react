import {BASE_COLORS, BASE_FONTS, GlobalStyles} from '~Root/config';

import {StyleSheet} from 'react-native';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  count: {
    ...GlobalStyles.pv5,
    ...GlobalStyles.ph10,
    backgroundColor: BASE_COLORS.oxleyColor,
    borderRadius: adjust(16),
  },
  btnClose: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
  },
  btnBack: {
    ...GlobalStyles.pv8,
    ...GlobalStyles.ph10,
    ...GlobalStyles.mv15,
    ...GlobalStyles.ml10,
    backgroundColor: BASE_COLORS.aeroColor,
    borderRadius: adjust(100),
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  bgGray: {
    ...GlobalStyles.p15,
    backgroundColor: BASE_COLORS.gray90Color,
    borderRadius: adjust(30),
    alignItems: 'center',
  },
  icon: {
    ...GlobalStyles.pv5,
    ...GlobalStyles.ph10,
    backgroundColor: BASE_COLORS.tealBlueColor,
    borderRadius: adjust(20),
  },
  imageProfile: {
    width: adjust(90),
    height: adjust(90),
    borderRadius: 180,
  },
  imageSmall: {
    width: adjust(50),
    height: adjust(50),
    borderRadius: 100,
  },
  imageSmallLeft: {
    width: adjust(50),
    height: adjust(50),
    borderRadius: 100,
    marginLeft: adjust(-15),
  },
  restOf: {
    backgroundColor: BASE_COLORS.buffColor,
    width: adjust(50),
    height: adjust(50),
    borderRadius: adjust(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: adjust(-40),
  },
  border_1: {
    borderBottomColor: BASE_COLORS.blackColor,
    borderBottomWidth: 1,
  },
  textHeader: {
    ...GlobalStyles.pv5,
    fontSize: adjust(10),
    paddingLeft: adjust(8),
    paddingRight: adjust(8),
    borderRadius: 10,
  },
  mainButtonArea: {
    ...GlobalStyles.mainButtonArea,
  },
  cancelButtonArea: {
    ...GlobalStyles.mainButtonArea,
    ...GlobalStyles.mr10,
    backgroundColor: BASE_COLORS.indianRedColor,
  },
  mainButtonTextStyle: {
    ...GlobalStyles.h5,
    ...GlobalStyles.mainButtonTextStyle,
  },
  buttonGroup: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: adjust(5),
  },
  textStyle: {
    ...GlobalStyles.h5,
    ...GlobalStyles.mainButtonTextStyle,
  },
  block: {
    alignSelf: 'flex-start',
  },
  subTitle: {
    fontFamily: BASE_FONTS.regular,
    color: BASE_COLORS.antiFlashWhiteColor,
    fontSize: adjust(10),
  },
  btnGreen: {
    ...GlobalStyles.ph10,
    ...GlobalStyles.pv5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: adjust(50),
    backgroundColor: BASE_COLORS.oxleyColor,
  },
  btnCommentGreen: {
    ...GlobalStyles.ph20,
    ...GlobalStyles.pv5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: adjust(50),
    backgroundColor: BASE_COLORS.oxleyColor,
  },
  borderBottom: {
    ...GlobalStyles.mb15,
    borderBottomWidth: 1,
    borderBottomColor: BASE_COLORS.gray90Color,
  },
});
