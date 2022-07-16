import {PixelRatio, StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  container: {
    ...GlobalStyles.ph15,
    ...GlobalStyles.pv20,
    alignItems: 'center',
    backgroundColor: BASE_COLORS.whiteColor,
  },
  scrollContentContainer: {
    flexGrow: 1,
    width: '100%',
  },
  pickerContainer: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: BASE_COLORS.eerieBlackColor,
    overflow: 'hidden',
    width: '100%',
  },
  picker: {
    backgroundColor: BASE_COLORS.whiteColor,
    height: 55,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: '#000000',
    borderWidth: 0.5,
  },
  pickerItemStyle: {
    color: BASE_COLORS.blackColor,
    textTransform: 'uppercase',
  },
  pickerItemStyle1: {
    color: BASE_COLORS.blackColor,
    textTransform: 'uppercase',
  },
  tagContainer: {
    ...GlobalStyles.p10,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: BASE_COLORS.grayColor,
    borderRadius: adjust(10),
    width: '100%',
  },
  tagArea: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  tag: {
    ...GlobalStyles.pv5,
    ...GlobalStyles.ph10,
    ...GlobalStyles.mr5,
    borderWidth: 1,
    borderColor: BASE_COLORS.eerieBlackColor,
    borderRadius: adjust(12),
    marginBottom: 10,
  },
  btnAddContainer: {
    ...GlobalStyles.mt10,
    width: '100%',
    alignItems: 'center',
  },
  btnAdd: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: adjust(10),
  },
  textBtnAdd: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    lineHeight: adjust(30),
  },
  alignEnd: {
    alignSelf: 'flex-end',
  },
  styleContainer: {
    width: '100%',
  },
  inputStyle: {
    ...GlobalStyles.pv15,
    color: BASE_COLORS.primary,
    fontSize: adjust(BASE_STYLES.h5),
  },
  inputBorderStyle: {
    ...GlobalStyles.mt10,
    ...GlobalStyles.p10,
    borderColor: BASE_COLORS.grayColor,
    borderWidth: 1,
    color: BASE_COLORS.primary,
    fontSize: adjust(BASE_STYLES.h5),
    width: '100%',
    textAlign: 'center',
  },
  inputErrorStyle: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: BASE_COLORS.redColor,
  },
  labelStyle: {
    fontFamily: BASE_FONTS.semiBold,
    fontSize: adjust(BASE_STYLES.h5),
    color: BASE_COLORS.primary,
  },
  userList: {
    display: 'flex',
    width: '100%',
    paddingBottom: 20,
  },
  userItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
  },
  userTitle: {
    fontSize: 18,
    color: BASE_COLORS.blackColor,
    marginLeft: 20,
  },
  styleModal: {
    ...GlobalStyles.ph15,
    ...GlobalStyles.pt15,
  },
  styleModalContainer: {
    justifyContent: 'center',
  },
});
