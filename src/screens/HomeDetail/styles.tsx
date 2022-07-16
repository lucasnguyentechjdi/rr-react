import { BASE_COLORS, BASE_FONTS, GlobalStyles } from '~Root/config';
import { Dimensions, StyleSheet } from 'react-native';

import { adjust } from '~Root/utils';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.steelBlue,
    flex: 1,
  },
  header: {
    backgroundColor: BASE_COLORS.brightGray,
    position: 'relative',
  },
  timeTag: {
    backgroundColor: BASE_COLORS.whiteColor,
    ...GlobalStyles.ph20,
    ...GlobalStyles.pv5,
    borderRadius: 20,
  },
  scrollView: {
    backgroundColor: BASE_COLORS.whiteColor,
    marginTop: 0,
    zIndex: -1,
    paddingTop: 0,
    flex: 1,
  },
  contentContainerStyle: {
    ...GlobalStyles.ph20,
  },
  editButton: {
    ...GlobalStyles.mr20,
  },
  editIcon: {
    color: BASE_COLORS.steelBlue,
    lineHeight: adjust(20),
  },
  dropDownContentStyle: {
    ...GlobalStyles.ph20,
    borderRadius: 5,
  },
  menuItem: {
    ...GlobalStyles.pv10,
    borderBottomWidth: 1,
    borderBottomColor: BASE_COLORS.lightGray,
  },
  underlineCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderBottom: {
    borderBottomColor: BASE_COLORS.oldSilverColor,
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 0.8,
    overflow: 'hidden',
  },
  locationText: {
    fontFamily: BASE_FONTS.notoSanRegular,
    flex: 0.9,
  },
  title: {
    flex: 0.9,
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 0.8,
  },
  buttonGroup: {
    ...GlobalStyles.mv20,
    ...GlobalStyles.mh20,
    flex: 1,
    justifyContent: 'space-around',
  },
  secondButtonGroup: {
    ...GlobalStyles.mv20,
    ...GlobalStyles.ph20,
    flex: 1,
    justifyContent: 'space-evenly',
  },
  buttonContainerStyle: {
    ...GlobalStyles.flexRow,
    ...GlobalStyles.mb15,
    ...GlobalStyles.pv15,
    borderWidth: 1,
    borderColor: BASE_COLORS.blackColor,
    borderRadius: adjust(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondButtonStyle: {
    ...GlobalStyles.flexRow,
    ...GlobalStyles.pv10,
    ...GlobalStyles.ph30,
    borderWidth: 1,
    borderColor: BASE_COLORS.whiteColor,
    borderRadius: adjust(24),
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%'
  },
  h5BoldDefault: {
    ...GlobalStyles.h5,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.eerieBlackColor,
  },
  tagStyleContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    display: 'flex',
    backgroundColor: BASE_COLORS.aeroColor,
  },
  tagStyle: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.eerieBlackColor,
    width: '100%',
  },
  text: {
    lineHeight: adjust(24),
  },
  reportContainer: {
    alignSelf: 'flex-end',
  },
  buttonGroupMain: {
    width: '100%',
    justifyContent: 'space-between',
  },
  buttonContainerHalfStyle: {
    ...GlobalStyles.flexRow,
    ...GlobalStyles.pv10,
    ...GlobalStyles.ph40,
    ...GlobalStyles.ph15,
    ...GlobalStyles.mb15,
    borderWidth: 1,
    borderColor: BASE_COLORS.blackColor,
    borderRadius: adjust(24),
    justifyContent: 'center',
    alignItems: 'center',
    // width: width / 2 - adjust(25),
  },
  whiteText: {
    color: BASE_COLORS.whiteColor,
    fontFamily: BASE_FONTS.notoSanSemiBold,
  },
  fontNotoSan: {
    fontFamily: BASE_FONTS.notoSanRegular,
    lineHeight: adjust(19),
  },
});
