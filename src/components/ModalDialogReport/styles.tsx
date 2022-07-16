import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';

import {PixelRatio, Platform, StyleSheet} from 'react-native';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
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
    ...GlobalStyles.p15,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  itemNoBorder: {
    ...GlobalStyles.p15,
    alignItems: 'center',
  },
  buttonContainerStyle: {
    backgroundColor: BASE_COLORS.spanishGrayColor,
    borderRadius: 24,
    paddingVertical: adjust(8),
    paddingHorizontal: adjust(25),
    fontSize: 14,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimaryContainerStyle: {
    backgroundColor: BASE_COLORS.oxleyColor,
    borderRadius: 24,
    paddingVertical: adjust(8),
    paddingHorizontal: adjust(25),
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  buttonGroup: {
    ...GlobalStyles.mt20,
    ...GlobalStyles.mb38,
    height: 40,
  },
  modal: {
    minHeight: 120,
  },
  h5BoldDefault: {
    ...GlobalStyles.h5,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.whiteColor,
  },
  inputStyle: {
    ...GlobalStyles.pv15,
    borderWidth: 1,
    borderColor: BASE_COLORS.blackColor,
    color: BASE_COLORS.primary,
    borderRadius: adjust(10),
    fontSize: adjust(BASE_STYLES.h5),
    height: '40%',
    padding: 10,
  },
  labelStyle: {
    fontFamily: BASE_FONTS.semiBold,
    fontSize: adjust(BASE_STYLES.h5),
    lineHeight: adjust(24),
    color: BASE_COLORS.primary,
  },
});
