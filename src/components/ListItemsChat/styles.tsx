import {StyleSheet} from 'react-native';

import {BASE_COLORS, BASE_FONTS, GlobalStyles} from '~Root/config';

export default StyleSheet.create({
  listContainer: {
    ...GlobalStyles.pb150,
  },
  tagStyle: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.eerieBlackColor,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: BASE_COLORS.eerieBlackColor,
  },
});
