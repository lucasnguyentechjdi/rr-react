import { BASE_COLORS, BASE_FONTS, GlobalStyles } from '~Root/config';

import { StyleSheet } from 'react-native';
import { adjust } from '~Root/utils';

export default StyleSheet.create({
  contain: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: BASE_COLORS.whiteColor,
  },
  contentContainer: {
    ...GlobalStyles.mt20,
    ...GlobalStyles.mh10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 8,
    borderBottomRightRadius: 30,
    elevation: 2,
    flex: 1,
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: BASE_COLORS.brightGray,
  },
  detailContent: {
    ...GlobalStyles.p10,
    width: '100%',
    backgroundColor: BASE_COLORS.steelBlue,
  },
  titleContent: {
  },
  timeTag: {
    backgroundColor: BASE_COLORS.whiteColor,
    ...GlobalStyles.ph20,
    ...GlobalStyles.pv5,
    borderRadius: 20,
  },
  rightContainer: {
    alignSelf: 'flex-end',
    backgroundColor: BASE_COLORS.antiFlashWhiteColor,
    borderBottomLeftRadius: adjust(10),
    paddingHorizontal: adjust(10),
    paddingVertical: adjust(6),
  },
  itemContainer: {
    flex: 1,
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 0.9,
  },
  locationText: {
    flex: 0.9,
    fontFamily: BASE_FONTS.notoSanRegular,
    lineHeight: adjust(19),
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 0.9,
  },
  textNotoSans: {
    fontFamily: BASE_FONTS.notoSanRegular,
    lineHeight: adjust(19),
  },
});
