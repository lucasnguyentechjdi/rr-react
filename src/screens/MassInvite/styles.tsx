import {Platform, StyleSheet} from 'react-native';

import {BASE_COLORS, BASE_FONTS, GlobalStyles, BASE_STYLES} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  massInviteContainer: {
    paddingLeft: adjust(16),
    paddingRight: adjust(16),
  },
  scrollView: {
    flex: 1,
  },
  generateDes: {
    marginTop: adjust(45),
    marginBottom: adjust(45),
    color: BASE_COLORS.steelBlueColor,
    width: '70%',
    alignSelf: 'center',
  },
  headerContainer: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
  title: {
    fontFamily: BASE_FONTS.semiBold,
    fontSize: adjust(BASE_STYLES.h5),
    lineHeight: 24,
    color: BASE_COLORS.blackColor,
  },
  useLeftCount: {
    marginTop: adjust(45),
    color: BASE_COLORS.steelBlueColor,
  },
  useLeft: {
    color: BASE_COLORS.steelBlueColor,
  },
  shareBtnContainer: {
    marginTop: 50,
    marginBottom: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: BASE_COLORS.gray,
  },
  shareBtn: {
    color: BASE_COLORS.gray,
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
  },
  copyCodeInput: {
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: BASE_COLORS.gray,
    paddingLeft: 18,
    paddingRight: 18,
    marginTop: 10
  },
  inviteCode: {
    color: BASE_COLORS.blackColor,
    fontFamily: BASE_FONTS.notoSanRegular
  },
  cancelBtnContainer: {
    marginTop: 50,
    marginBottom: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: BASE_COLORS.oxleyColor,
  },
  cancelBtn: {
    color: BASE_COLORS.oxleyColor,
    fontWeight: '400',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
  },
  inviteNote: {
    fontSize: 12,
    marginTop: 60
  },
  inviteMessage: {
    fontSize: 12,
    marginTop: 10
  },
  qrCodeContainer: {
    paddingTop: adjust(25),
    paddingBottom: adjust(25),
    paddingLeft: adjust(45),
    paddingRight: adjust(45),
    borderWidth: adjust(1),
    borderColor: BASE_COLORS.lavenderGray,
    borderRadius: 12,
    marginLeft: adjust(30),
    marginRight: adjust(30),
    marginTop: adjust(25),
  },
  shareQRBtnContainer: {
    marginTop: 16,
    marginBottom: 10,
    borderRadius: 30,
    borderWidth: 1,
    marginLeft: adjust(30),
    marginRight: adjust(30),
    borderColor: BASE_COLORS.gray,
  },
  shareQRBtn: {
    color: BASE_COLORS.gray,
    fontSize: 14,
    marginTop: 8,
    marginBottom: 8,
  },
  confirmCancelBts: {
  },
  confirmBtnContainer: {
  },
  containerBtnContainer: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: BASE_COLORS.oxleyColor,
    backgroundColor: BASE_COLORS.oxleyColor,
    margin: 10,
    marginBottom: 45,
    paddingTop: 10,
    paddingBottom: 10,
  },
  outlineBtnContainer: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: BASE_COLORS.oxleyColor,
    backgroundColor: BASE_COLORS.whiteColor,
    margin: 10,
    marginBottom: 45,
    paddingTop: 10,
    paddingBottom: 10,
  },
  containerBtn: {
    color: BASE_COLORS.whiteColor,
    backgroundColor: BASE_COLORS.oxleyColor,
    fontSize: 14,
    width: adjust(100)
  },
  outlineBtn: {
    color: BASE_COLORS.oxleyColor,
    backgroundColor: BASE_COLORS.whiteColor,
    fontSize: 14,
    width: adjust(100)
  },
  confirmMessage: {
    marginTop: adjust(45),
    marginBottom: adjust(10),
    width: '70%',
    alignSelf: 'center',
    fontSize: 14,
  }
});
