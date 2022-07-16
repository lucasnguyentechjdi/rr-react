import { StyleSheet } from 'react-native';

import { BASE_COLORS, GlobalStyles, BASE_FONTS } from '~Root/config';
import { adjust } from '~Root/utils';

export default StyleSheet.create({
  tagContainer: {
    ...GlobalStyles.mb15,
    ...GlobalStyles.p10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: BASE_COLORS.greyBlue,
    borderRadius: adjust(10),
    width: '100%',
  },
  titleStyle: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.gunmetalColor,
  },
  titleLeftStyle: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.gunmetalColor,
    textAlign: 'left',
    width: '100%',
    marginBottom: 10,
  },
  tagSubTitle: {
    ...GlobalStyles.flexRow,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  subTitleStyle: {
    ...GlobalStyles.ml10,
  },
  centerAlign: {
    textAlign: 'center',
    width: '100%',
  },
  buttonContainer: {
    ...GlobalStyles.flexRow,
    ...GlobalStyles.mt30,
    ...GlobalStyles.ph20,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: adjust(20),
    backgroundColor: 'transparent',
  },
  disabledButtonContainer: {
    ...GlobalStyles.flexRow,
    ...GlobalStyles.mt30,
    ...GlobalStyles.ph20,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: adjust(20),
    backgroundColor: 'transparent',
    borderColor: BASE_COLORS.spanishGrayColor,
  },
  buttonTextStyle: {
    ...GlobalStyles.mr10,
    color: BASE_COLORS.blackColor,
  },
  disabledButtonTextStyle: {
    ...GlobalStyles.mr10,
    color: BASE_COLORS.spanishGrayColor,
  },
  cardItemContainer: {
    ...GlobalStyles.mt20,
    alignItems: 'center',
    flex: 1,
  },
  cardSubTitleContainerStyle: {
    ...GlobalStyles.mt15,
  },
  cardTextRequiredStyle: {
    ...GlobalStyles.mt30,
    ...GlobalStyles.mr30,
    alignSelf: 'flex-end',
  },
  subTitleContainer: {
    ...GlobalStyles.flexRow,
    ...GlobalStyles.mt30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  subTitle: {
    ...GlobalStyles.ml10,
    color: BASE_COLORS.gunmetalColor,
  },
  tooltipContentStyle: {
    ...GlobalStyles.p10,
    backgroundColor: BASE_COLORS.davysGreyColor,
    flex: 1,
    width: '80%',
  },
  tooltipContentStyleLong: {
    ...GlobalStyles.p10,
    backgroundColor: BASE_COLORS.davysGreyColor,
    flex: 1,
    width: '100%',
  },
  tooltipTextColor: {
    color: BASE_COLORS.antiFlashWhiteColor,
    paddingRight: adjust(20),
  },
  tooltipCloseBtn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  tooltipStyle: {},
  titleFlex: {
    ...GlobalStyles.mb15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  checkBoxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    width: adjust(13),
    height: adjust(13),
    borderRadius: adjust(3),
    position: 'relative',
  },
  checkIcon: {
    position: 'absolute',
    top: '20%',
    left: '20%',
  },
});
