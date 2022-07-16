import {BASE_COLORS, GlobalStyles} from '~Root/config';

import {StyleSheet} from 'react-native';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  header: {
    ...GlobalStyles.pv15,
    backgroundColor: BASE_COLORS.aeroColor,
    alignItems: 'center',
  },
  btnBack: {
    ...GlobalStyles.pv8,
    ...GlobalStyles.ph10,
    ...GlobalStyles.mv15,
    ...GlobalStyles.ml10,
    backgroundColor: BASE_COLORS.aeroColor,
    borderRadius: adjust(100),
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  bgGray: {
    ...GlobalStyles.pb15,
    ...GlobalStyles.ph15,
    backgroundColor: BASE_COLORS.gray90Color,
    borderRadius: adjust(30),
    alignItems: 'center',
  },
  icon: {
    ...GlobalStyles.pv5,
    ...GlobalStyles.ph10,
    backgroundColor: BASE_COLORS.tealBlueColor,
    borderRadius: adjust(20),
  },
  iconView: {
    borderRadius: adjust(20),
  },
  imageProfile: {
    width: adjust(80),
    height: adjust(80),
    borderRadius: 160,
  },
  border_1: {
    borderBottomColor: BASE_COLORS.blackColor,
    borderBottomWidth: 1,
  },
  textHeader: {
    ...GlobalStyles.pv5,
    fontSize: adjust(10),
    paddingLeft: adjust(8),
    paddingRight: adjust(8),
    borderRadius: 10,
  },
  mainButtonArea: {
    ...GlobalStyles.mainButtonArea,
  },
  cancelButtonArea: {
    ...GlobalStyles.mainButtonArea,
    ...GlobalStyles.mr10,
    backgroundColor: BASE_COLORS.indianRedColor,
  },
  mainButtonTextStyle: {
    ...GlobalStyles.h5,
    ...GlobalStyles.mainButtonTextStyle,
  },
  buttonGroup: {
    flex: 1,
    justifyContent: 'center',
  },
  textStyle: {
    ...GlobalStyles.h5,
    ...GlobalStyles.mainButtonTextStyle,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: BASE_COLORS.oldSilverColor,
    paddingBottom: adjust(4),
    borderBottomWidth: 1,
  },
  border: {
    borderColor: BASE_COLORS.blackColor,
    paddingTop: adjust(8),
    marginTop: adjust(8),
    borderTopWidth: 1,
  },
  imageProfileSmall: {
    width: adjust(28),
    height: adjust(28),
    borderRadius: adjust(130),
    overflow: 'hidden',
  },
  headerInfo: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: adjust(32),
    alignItems: 'center',
    marginBottom: adjust(15),
    ...GlobalStyles.pv5,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 15,
    marginTop: adjust(10),
    marginBottom: adjust(10),
    color: '#1C1D1E',
  },
  buttonViewProfile: {
    backgroundColor: BASE_COLORS.oxleyColor,
    ...GlobalStyles.pv10,
    marginTop: adjust(15),
    borderRadius: 22,
    ...GlobalStyles.ph5,
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 0.9,
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 0.9,
  },
  seekingRecommend: {
    paddingHorizontal: adjust(13),
    paddingVertical: adjust(7),
    backgroundColor: BASE_COLORS.aeroColor,
    borderRadius: 10,
    color: BASE_COLORS.eerieBlackColor,
  },
  askLabel: {
    borderRadius: 10,
  },
  locationText: {
    flex: 0.9,
  },
  textBlack: {
    color: BASE_COLORS.eerieBlackColor,
  },
  iconStatus: {
    position: 'absolute',
    right: -5,
    bottom: -5,
    borderRadius: adjust(130),
    width: adjust(15),
    height: adjust(15),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyTime: {
    marginRight: adjust(8),
    width: '30%',
  },
  textTime: {
    color: BASE_COLORS.blackColor,
    fontSize: 12,
    lineHeight: 15,
  },
  textHistory: {
    color: BASE_COLORS.blackColor,
    fontSize: 12,
    lineHeight: 15,
  },
});
