import {BASE_COLORS, BASE_FONTS, GlobalStyles} from '~Root/config';

import {StyleSheet} from 'react-native';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  contain: {
    ...GlobalStyles.mb15,
    ...GlobalStyles.p10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: BASE_COLORS.whiteColor,
  },
  itemContainer: {
    ...GlobalStyles.flexColumn,
    flex: 1,
    alignItems: 'flex-start',
  },
  imageProfileContainer: {
    ...GlobalStyles.mr10,
    width: adjust(50),
    height: adjust(50),
    borderRadius: adjust(100),
    overflow: 'hidden',
    paddingLeft: 10,
  },
  imageProfile: {
    width: '100%',
    height: '100%',
  },
  boldTitle: {
    color: BASE_COLORS.lightBlackColor,
    lineHeight: 21,
  },
  title: {
    color: BASE_COLORS.lightBlackColor,
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
  profileContainer: {
    ...GlobalStyles.flexRow,
  },
  tag: {
    ...GlobalStyles.pv5,
    ...GlobalStyles.ph5,
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
});
