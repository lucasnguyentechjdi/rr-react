import { BASE_COLORS, BASE_FONTS, GlobalStyles } from '~Root/config';
import { Dimensions, StyleSheet } from 'react-native';

import { adjust } from '~Root/utils';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  contentBackground: {
    backgroundColor: BASE_COLORS.steelBlue,
  },
  reportContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-start',
  },
  text: {
    lineHeight: adjust(24),
  },
  textReport: {
    fontSize: adjust(10),
    textTransform: 'uppercase',
    color: BASE_COLORS.whiteColor,
  },
  buttonGroup: {
    ...GlobalStyles.mv20,
    flex: 1,
  },
  buttonGroupMain: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainerHalfStyle: {
    ...GlobalStyles.flexRow,
    ...GlobalStyles.pv10,
    paddingLeft: 40,
    paddingRight: 40,
    ...GlobalStyles.mb15,
    borderWidth: 1,
    backgroundColor: 'transparent',
    color: BASE_COLORS.whiteColor,
    borderColor: BASE_COLORS.whiteColor,
    borderRadius: adjust(24),
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainerStyle: {
    ...GlobalStyles.flexRow,
    ...GlobalStyles.pv10,
    ...GlobalStyles.ph15,
    ...GlobalStyles.mb15,
    borderWidth: 1,
    borderColor: BASE_COLORS.blackColor,
    borderRadius: adjust(24),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  h5BoldDefault: {
    ...GlobalStyles.h5,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.whiteColor,
  },
  textStyle: {
    textAlign: 'center',
  },
  inputContainer: {
    ...GlobalStyles.ph10,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(229, 229, 229, 0.46);',
    borderRadius: adjust(10),
    alignItems: 'center',
  },
  input: {
    ...GlobalStyles.h5,
    fontWeight: '600',
    flex: 1,
    lineHeight: adjust(17),
    color: BASE_COLORS.gunmetalColor,
  },
  modalHeader: {
    ...GlobalStyles.mb20,
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
  textUnderlineArea: {
    ...GlobalStyles.ph15,
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  underlineCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderBottom: {
    borderBottomColor: BASE_COLORS.oldSilverColor,
  },
  askDetailContent: {
    ...GlobalStyles.p10,
    width: '100%',
    height: '60%',
    backgroundColor: BASE_COLORS.steelBlue,
  },
  title: {
    flex: 0.9,
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 0.9,
  },
  locationText: {
    flex: 0.9,
    fontFamily: BASE_FONTS.notoSanRegular,
    lineHeight: adjust(19),
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 0.9,
  },
  textNotoSans: {
    fontFamily: BASE_FONTS.notoSanRegular,
    lineHeight: adjust(19),
  },
});
