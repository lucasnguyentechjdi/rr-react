import {PixelRatio, StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  calendarContainer: {
    ...GlobalStyles.flexColumn,
    ...GlobalStyles.p10,
  },
  calendarBgDisabled: {
    ...GlobalStyles.mt10,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: BASE_COLORS.blackColor,
    opacity: 0.3,
    zIndex: 10,
    borderRadius: adjust(5),
  },
  modalHeader: {
    width: '60%',
  },
  title: {
    ...GlobalStyles.textUppercase,
  },
  calendarBgSteelBlue: {
    backgroundColor: BASE_COLORS.steelBlueColor,
  },
  calendarBgIndianRed: {
    backgroundColor: BASE_COLORS.indianRedColor,
  },
  calendarText: {
    color: BASE_COLORS.gunmetalColor,
  },
  styleModal: {
    flex: 0.8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  styleModalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  checkBoxContainer: {
    ...GlobalStyles.mv20,
  },
  iconStyle: {
    ...GlobalStyles.mr5,
  },
  textStyle: {
    ...GlobalStyles.p,
    fontFamily: BASE_FONTS.semiBold,
    color: BASE_COLORS.steelBlueColor,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  mainButtonContainer: {
    alignItems: 'center',
  },
  mainButtonTextStyle: {
    ...GlobalStyles.h5,
    ...GlobalStyles.mainButtonTextStyle,
    alignSelf: 'center',
  },
  mainButtonArea: {
    ...GlobalStyles.mainButtonArea,
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 30,
  },
});
