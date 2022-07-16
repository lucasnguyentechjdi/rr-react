import { BASE_COLORS, BASE_FONTS, GlobalStyles } from '~Root/config';

import { Dimensions, StyleSheet } from 'react-native';
import { adjust } from '~Root/utils';
const { width } = Dimensions.get('window');
export default StyleSheet.create({
  contain: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: BASE_COLORS.whiteColor,
  },
  askContain: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: width - 80,
    height: '98%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: BASE_COLORS.steelBlue,
    borderRadius: 8,
    borderBottomRightRadius: 30,
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
  askAirFeedBlock: {
    borderRadius: 8,
    padding: 0,
    overflow: 'hidden',
  },
  askTitleBlock: {
    backgroundColor: '#E5EFF7',
    width: '100%',
    overflow: 'hidden',
    padding: 20,
    paddingTop: 10,
    paddingBottom: 0,
  },
  detailContent: {
    ...GlobalStyles.p10,
    width: '100%',
    backgroundColor: BASE_COLORS.steelBlue,
  },
  askDetailContent: {
    ...GlobalStyles.p10,
    width: '100%',
    height: '60%',
    backgroundColor: BASE_COLORS.steelBlue,
  },
  titleContent: {},
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
  profileContainer: {
    ...GlobalStyles.flexRow,
  },
  imageProfileContainer: {
    ...GlobalStyles.mr10,
    width: adjust(50),
    height: adjust(50),
    borderRadius: adjust(100),
    overflow: 'hidden',
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
  groupText: {
    ...GlobalStyles.pt5,
    ...GlobalStyles.container,
    ...GlobalStyles.mr10,
    alignSelf: 'flex-start',
  },
});
