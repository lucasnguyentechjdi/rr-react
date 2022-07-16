import { StyleSheet, Platform } from 'react-native';
import { BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles } from '~Root/config';
import { adjust } from '~Root/utils';

export default StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
  headerContainer: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
  pickerContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    fontWeight: 'bold',
  },
  picker: {
    backgroundColor: BASE_COLORS.oxleyColor,
    color: BASE_COLORS.whiteColor,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  pickerText: {
    color: BASE_COLORS.whiteColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  pickerItemStyle: {
    color: BASE_COLORS.whiteColor,
    textTransform: 'uppercase',
    backgroundColor: BASE_COLORS.greyColor,
  },
  pickerItem: {
    backgroundColor: BASE_COLORS.greyColor,
  },
  pickerItemStyle1: {
    color: BASE_COLORS.blackColor,
    textTransform: 'uppercase',
  },
  inputStyle: {
    borderBottomColor: BASE_COLORS.blackColor,
    borderWidth: 0,
    borderBottomWidth: 1,
    paddingVertical: 14,
    color: BASE_COLORS.blackColor,
    fontSize: adjust(BASE_STYLES.h5),
    borderRadius: 0,
    flex: 1,
    height: Platform.OS === 'ios' ? 'auto' : 48,
  },
  labelStyle: {
    fontFamily: BASE_FONTS.semiBold,
    fontSize: adjust(BASE_STYLES.h5),
    lineHeight: 24,
    color: BASE_COLORS.blackColor,
  },
  title: {
    fontFamily: BASE_FONTS.semiBold,
    fontSize: adjust(BASE_STYLES.h5),
    lineHeight: 24,
    color: BASE_COLORS.blackColor,
  },
  inputErrorStyle: {
    // borderWidth: 0,
    // borderBottomWidth: 1,
    borderBottomColor: BASE_COLORS.redColor,
  },
  checkbox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textAreaStyle: {
    borderColor: BASE_COLORS.blackColor,
    borderRadius: 12,
    marginTop: 10,
    height: 82,
    color: BASE_COLORS.blackColor,
  },
  textAreaCountStyle: {
    textAlign: 'right',
    marginTop: 5,
  },
  mainButtonContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textStyle: {
    ...GlobalStyles.h4,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: 'bold',
    lineHeight: adjust(32),
  },
  mainButtonArea: {
    ...GlobalStyles.pv5,
    ...GlobalStyles.ph30,
    borderRadius: adjust(24),
    backgroundColor: BASE_COLORS.oxleyColor,
  },
  optionList: {
    display: 'flex',
    width: '100%',
  },
  optionItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
  },
  optionTitle: {
    fontSize: 18,
    color: BASE_COLORS.blackColor,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  styleModal: {
    ...GlobalStyles.ph15,
    ...GlobalStyles.pt15,
    backgroundColor: BASE_COLORS.greyBlue,
    borderRadius: 15,
  },
  styleModalContainer: {
    justifyContent: 'center',
  },
});
