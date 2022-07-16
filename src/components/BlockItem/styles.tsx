import { StyleSheet } from 'react-native';

import { BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles } from '~Root/config';
import { adjust } from '~Root/utils';

export default StyleSheet.create({
  contain: {
    ...GlobalStyles.mb15,
    ...GlobalStyles.p10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: BASE_COLORS.whiteColor,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  itemSuggestionContainer: {
    borderWidth: 1,
    borderColor: BASE_COLORS.blackColor,
    borderRadius: adjust(22),
    padding: adjust(12),
    width: '100%',
  },
  itemSuggestionHeader: {
    width: '100%',
    paddingHorizontal: adjust(5),
  },
  textNormal: {
    fontFamily: BASE_FONTS.regular,
    fontWeight: '500',
    fontSize: BASE_STYLES.h5,
    lineHeight: 24,
    color: BASE_COLORS.lightBlackColor,
  },
  textBlue: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    fontSize: BASE_STYLES.h5,
    lineHeight: 24,
    color: BASE_COLORS.primary,
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
  boldTitle: {
    color: BASE_COLORS.lightBlackColor,
    lineHeight: 21,
  },
  boldLightTitle: {
    color: BASE_COLORS.grayX11Color,
    lineHeight: 21,
  },
  title: {
    color: BASE_COLORS.lightBlackColor,
    lineHeight: 21,
    fontWeight: '400',
    flexWrap: 'wrap',
  },
  lightTitle: {
    color: BASE_COLORS.grayX11Color,
    lineHeight: 21,
    fontWeight: '400',
    flexWrap: 'wrap',
  },
  groupText: {
    ...GlobalStyles.pt5,
    ...GlobalStyles.container,
    ...GlobalStyles.mr10,
    alignSelf: 'flex-start',
  },
  groupBtn: {
    ...GlobalStyles.pt5,
    ...GlobalStyles.flexColumn,
    alignItems: 'flex-end',
  },
  iconMessageContainer: {
    ...GlobalStyles.pv5,
    ...GlobalStyles.ph20,
    ...GlobalStyles.mb5,
    alignSelf: 'flex-start',
    borderRadius: adjust(20),
    borderWidth: 1,
    borderColor: BASE_COLORS.eerieBlackColor,
  },
  iconMinusContainer: {
    ...GlobalStyles.mr15,
  },
  pendingContainer: {
    ...GlobalStyles.mb5,
  },
  pendingInviteArea: {
    ...GlobalStyles.pv5,
    ...GlobalStyles.ph10,
    ...GlobalStyles.textUppercase,
    fontSize: adjust(8),
    borderRadius: adjust(24),
    backgroundColor: BASE_COLORS.steelBlueColor,
    fontWeight: '600',
  },
  pendingAdd: {
    paddingHorizontal: adjust(20),
    fontSize: adjust(10),
  },
  profileContainer: {
    ...GlobalStyles.flexRow,
    flex: 1,
  },
});
