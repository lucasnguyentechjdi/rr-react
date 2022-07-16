import { StyleSheet } from 'react-native';
import { BASE_COLORS, BASE_FONTS, GlobalStyles } from '~Root/config';
import { adjust } from '~Root/utils';

export default StyleSheet.create({
  tag: {
    ...GlobalStyles.pv5,
    ...GlobalStyles.ph10,
    ...GlobalStyles.mt5,
    ...GlobalStyles.mb5,
    borderColor: BASE_COLORS.oxleyColor,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderRadius: adjust(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagText: {
    color: BASE_COLORS.oxleyColor,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    fontSize: adjust(14),
  },
  mr10: {
    ...GlobalStyles.mr10,
  },
  iconClose: {
    ...GlobalStyles.ml5,
    width: adjust(8),
    height: adjust(8),
  },
});
