import {StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';

export default StyleSheet.create({
  listContainer: {
    paddingVertical: 30,
    backgroundColor: 'rgba(196, 196, 196, 0.1)',
    borderRadius: 10,
  },
  buttonContainerStyle: {
    borderRadius: 24,
    backgroundColor: BASE_COLORS.whiteColor,
    borderColor: BASE_COLORS.primary,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 8,
  },
  buttonContainerActiveStyle: {
    borderRadius: 24,
    backgroundColor: BASE_COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 8,
  },
  buttonTextStyle: {
    fontFamily: BASE_FONTS.semiBold,
    fontSize: BASE_STYLES.h3,
    lineHeight: 32,
    color: BASE_COLORS.primary,
  },
  buttonTextActiveStyle: {
    fontFamily: BASE_FONTS.semiBold,
    fontSize: BASE_STYLES.h3,
    lineHeight: 32,
    color: BASE_COLORS.whiteColor,
  },
  textRequiredStyle: {
    color: BASE_COLORS.indianRedColor,
  },
  subTitleContainer: {
    ...GlobalStyles.flexRow,
    alignItems: 'center',
  },
});
