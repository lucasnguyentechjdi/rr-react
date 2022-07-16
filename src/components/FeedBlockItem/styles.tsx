import {BASE_COLORS, GlobalStyles} from '~Root/config';

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
    ...GlobalStyles.mb10,
  },
});
