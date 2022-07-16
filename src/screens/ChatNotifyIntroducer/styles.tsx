import {BASE_COLORS, GlobalStyles} from '~Root/config';

import {StyleSheet} from 'react-native';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  header: {
    ...GlobalStyles.pv15,
    backgroundColor: BASE_COLORS.aeroColor,
    alignItems: 'center',
  },
  containerInfo: {
    backgroundColor: BASE_COLORS.gray90Color,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    marginHorizontal: adjust(22),
    paddingTop: adjust(24),
    paddingBottom: adjust(18),
    marginTop: adjust(5),
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
  imageProfileContainer: {
    ...GlobalStyles.mr10,
    width: adjust(50),
    height: adjust(50),
    borderRadius: adjust(130),
    overflow: 'hidden',
  },
  imageProfile: {
    width: '100%',
    height: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: BASE_COLORS.oldSilverColor,
    paddingBottom: adjust(4),
    paddingTop: adjust(4),
    borderBottomWidth: 1,
  },
  imageProfileSmall: {
    width: adjust(28),
    height: adjust(28),
    borderRadius: adjust(130),
    overflow: 'hidden',
  },
  icon: {
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
  iconView: {
    borderRadius: adjust(20),
  },
  border: {
    borderColor: BASE_COLORS.blackColor,
    paddingTop: adjust(8),
    marginTop: adjust(8),
    borderTopWidth: 1,
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
  historyTime: {
    marginRight: adjust(8),
    width: '30%',
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
