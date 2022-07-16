import {StyleSheet, Platform} from 'react-native';
import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
  headerContainer: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
  pickerContainer: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  picker: {
    backgroundColor: BASE_COLORS.oxleyColor,
  },
  pickerItemStyle: {
    color: BASE_COLORS.whiteColor,
    textTransform: 'uppercase',
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
    flex: 0.5,
  },
  inputErrorStyle: {
    borderWidth: 0,
    borderBottomWidth: 1,
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
    height: 52,
    color: BASE_COLORS.blackColor,
  },
  textAreaCountStyle: {
    textAlign: 'right',
    marginTop: 5,
  },
  mainButtonContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
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
  askHighlight: {
    textAlign: 'center',
  },
});
