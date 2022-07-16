import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';

import {StyleSheet} from 'react-native';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  container: {
    ...GlobalStyles.pv20,
    ...GlobalStyles.ph40,
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
    color: BASE_COLORS.whiteColor,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  imageProfileContainer: {
    ...GlobalStyles.mr10,
    width: adjust(65),
    height: adjust(65),
    borderRadius: adjust(130),
    overflow: 'hidden',
  },
  imageProfile: {
    width: '100%',
    height: '100%',
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
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleItemContainer: {
    alignItems: 'center',
  },
  styleGroupImage: {
    alignItems: 'center',
  },
  btnClose: {
    position: 'absolute',
    top: '2%',
    right: '5%',
  },
});
