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
    textAlign: 'center',
  },
  itemNoBorder: {
    alignItems: 'center',
  },
  styleModal: {
    flex: 0.4,
    alignItems: 'stretch',
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
