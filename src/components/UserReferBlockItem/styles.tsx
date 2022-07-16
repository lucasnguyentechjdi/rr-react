import {StyleSheet} from 'react-native';

import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  contain: {
    ...GlobalStyles.mb5,
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
    width: adjust(30),
    height: adjust(30),
    borderRadius: adjust(60),
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
  title: {
    color: BASE_COLORS.lightBlackColor,
    lineHeight: 21,
    fontWeight: '400',
    flexWrap: 'wrap',
  },
  groupText: {
    ...GlobalStyles.container,
    ...GlobalStyles.mr10,
  },
  profileContainer: {
    ...GlobalStyles.flexRow,
    flex: 1,
  },
});
