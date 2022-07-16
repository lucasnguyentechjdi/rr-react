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
  containerInfo: {
    marginHorizontal: adjust(32),
    paddingHorizontal: adjust(32),
    backgroundColor: BASE_COLORS.gray90Color,
    borderRadius: 30,
    alignItems: 'center',
    paddingBottom: adjust(32),
  },
  imageProfile: {
    width: adjust(80),
    height: adjust(80),
    borderRadius: 160,
    marginTop: adjust(15),
  },
  headerInfo: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: adjust(32),
    alignItems: 'center',
    ...GlobalStyles.pv5,
  },
  buttonViewProfile: {
    backgroundColor: BASE_COLORS.oxleyColor,
    ...GlobalStyles.pv10,
    marginTop: adjust(15),
    borderRadius: 22,
    ...GlobalStyles.ph5,
  },
  icon: {
    ...GlobalStyles.pv5,
    ...GlobalStyles.ph10,
    ...GlobalStyles.mt20,
    backgroundColor: BASE_COLORS.tealBlueColor,
    borderRadius: adjust(20),
  },
  seekingRecommend: {
    paddingHorizontal: adjust(13),
    paddingVertical: adjust(7),
    backgroundColor: BASE_COLORS.aeroColor,
    borderRadius: 10,
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 0.9,
  },
  locationText: {
    flex: 0.9,
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 0.9,
  },
});
