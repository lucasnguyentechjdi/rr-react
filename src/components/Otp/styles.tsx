import {StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  inputStyle: {
    ...GlobalStyles.inputStyle,
    borderRadius: adjust(5),
    color: BASE_COLORS.blackColor,
    backgroundColor: BASE_COLORS.culturedColor,
    textAlign: 'center',
    fontSize: adjust(20),
    paddingHorizontal: adjust(12),
    fontFamily: BASE_FONTS.semiBold,
    alignItems: 'center',
    fontWeight: '600',
  },
  row: {
    justifyContent: 'space-between',
  },
  labelStyle: {
    ...GlobalStyles.labelStyle,
    color: BASE_COLORS.blackColor,
  },
});
