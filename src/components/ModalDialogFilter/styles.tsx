import { BASE_COLORS, GlobalStyles } from '~Root/config';

import { StyleSheet } from 'react-native';
import { adjust } from '~Root/utils';

export default StyleSheet.create({
  closeIcon: {
    alignItems: 'flex-end',
  },
  modalHeader: {
    ...GlobalStyles.mb20,
  },
  content: {
    textAlign: 'left',
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
  item: {
    alignItems: 'center',
  },
  itemHeader: {
    ...GlobalStyles.mr5,
    ...GlobalStyles.pv20,
    color: BASE_COLORS.blackColor,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'left',
  },
  resetText: {
    ...GlobalStyles.mr5,
    ...GlobalStyles.pv20,
    color: BASE_COLORS.oxleyColor,
    fontSize: 11,
    lineHeight: 13,
    textAlign: 'right',
  },
  filterButton: {
    borderRadius: 20,
    backgroundColor: BASE_COLORS.whiteColor,
    paddingLeft: adjust(15),
    paddingRight: adjust(15),
    width: '40%',
    paddingTop: adjust(6),
    paddingBottom: adjust(6),
    color: BASE_COLORS.oxleyColor,
    borderColor: BASE_COLORS.oxleyColor,
    borderWidth: 1,
  },
  filterButtonActive: {
    borderRadius: 20,
    backgroundColor: BASE_COLORS.oxleyColor,
    paddingLeft: adjust(15),
    paddingRight: adjust(15),
    width: '40%',
    paddingTop: adjust(6),
    paddingBottom: adjust(6),
    color: BASE_COLORS.whiteColor,
    borderColor: BASE_COLORS.oxleyColor,
    borderWidth: 1,
  },
  textBtnFilter: {
    fontSize: adjust(11),
    fontWeight: '600',
    color: BASE_COLORS.oxleyColor,
  },
  textBtnFilterActive: {
    fontSize: adjust(11),
    fontWeight: '600',
    color: BASE_COLORS.whiteColor,
  },
  itemNoBorder: {
    alignItems: 'center',
  },
  styleModal: {
    flex: 1,
    borderRadius: 0,
    alignItems: 'stretch',
    zIndex: 999,
  },
  styleModalContainer: {
    justifyContent: 'flex-start',
    margin: 0,
  },
  itemText: {
    color: BASE_COLORS.oxleyColor,
  },
  buttonStyle: {
    ...GlobalStyles.flexRow,
    ...GlobalStyles.pv10,
    ...GlobalStyles.mb30,
    backgroundColor: BASE_COLORS.oxleyColor,
    borderRadius: adjust(24),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  textStyle: {
    fontWeight: '600',
  },
  tooltipCloseBtn: {
    ...GlobalStyles.mr10,
    flex: 1,
    alignItems: 'flex-end',
  },
  tooltipContentStyle: {
    ...GlobalStyles.p10,
    backgroundColor: BASE_COLORS.davysGreyColor,
  },
});
