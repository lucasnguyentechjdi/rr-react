import {BASE_COLORS, BASE_FONTS, GlobalStyles} from '~Root/config';

import {StyleSheet} from 'react-native';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  bg: {
    backgroundColor: BASE_COLORS.aeroColor,
    flex: 1,
  },
  container: {
    ...GlobalStyles.ph15,
    paddingTop: adjust(30),
    paddingBottom: adjust(30),
  },
  btnClose: {
    position: 'absolute',
    top: 10,
    right: '2%',
    zIndex: 1,
  },
  imageProfile: {
    width: adjust(110),
    height: adjust(110),
    borderRadius: 100,
  },
  imageSmall: {
    width: adjust(40),
    height: adjust(40),
    borderRadius: 100,
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
    width: '48%',
    height: '100%',
  },
  boxChat: {
    borderWidth: 1,
    borderColor: '#70707080',
    borderRadius: adjust(20),
    padding: adjust(10),
    marginTop: 15,
  },
  newButtonOutline: {
    ...GlobalStyles.pv5,
    ...GlobalStyles.ph8,
    ...GlobalStyles.mh5,
    backgroundColor: BASE_COLORS.blackColor,
    color: BASE_COLORS.aeroColor,
    fontSize: 12,
    borderRadius: adjust(50),
    alignItems: 'center',
    alignSelf: 'center',
  },
  textStyle: {
    color: BASE_COLORS.whiteColor,
    fontFamily: BASE_FONTS.semiBold,
    fontSize: adjust(12),
  },
  count: {
    ...GlobalStyles.ph5,
    borderRadius: adjust(25),
    backgroundColor: BASE_COLORS.indianRedColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    height: 30,
    minWidth: 30,
  },
  askEndStyleContainer: {
    borderRadius: 10,
    backgroundColor: BASE_COLORS.redColor,
    fontFamily: BASE_FONTS.semiBold,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  labelEndStyle: {
    color: BASE_COLORS.whiteColor,
    fontFamily: BASE_FONTS.semiBold,
    textTransform: 'capitalize',
  },
  countText: {
    color: BASE_COLORS.whiteColor,
  },
  arrowGroup: {
    ...GlobalStyles.flexRow,
    marginTop: 20,
  },
  askTitle: {
    width: '60%',
  },
});
