import {StyleSheet, Platform, PixelRatio} from 'react-native';

import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';
import {adjust, lineHeightByRatio, paddingByRatio} from '~Root/utils';

export default StyleSheet.create({
  container: {
    ...GlobalStyles.pb20,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemContainer: {
    ...GlobalStyles.mt10,
    ...GlobalStyles.mb15,
    ...GlobalStyles.ph10,
    width: '100%',
  },
  listContainer: {
    paddingBottom: adjust(20),
  },
  modal: {
    ...GlobalStyles.ph15,
    ...GlobalStyles.pb30,
    backgroundColor: BASE_COLORS.whiteColor,
    borderRadius: adjust(48),
    flex: 0.9,
  },
  title: {
    ...GlobalStyles.mt35,
    lineHeight: lineHeightByRatio(22),
    color: BASE_COLORS.gunmetalColor,
  },
  inputContainer: {
    ...GlobalStyles.mh15,
    ...GlobalStyles.mt15,
    ...GlobalStyles.ph10,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(229, 229, 229, 0.46);',
    borderRadius: adjust(10),
    width: '90%',
    paddingVertical: Platform.OS === 'ios' ? adjust(10) : 0,
    alignItems: 'center',
  },
  iconSearch: {
    ...GlobalStyles.mr10,
  },
  input: {
    ...GlobalStyles.h5,
    fontWeight: '600',
    flex: 1,
    lineHeight: adjust(17),
    color: BASE_COLORS.gunmetalColor,
  },
  itemContainer: {
    ...GlobalStyles.p10,
    flex: 1,
    width: '100%',
  },
  item: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  btnAddContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  btnAdd: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: paddingByRatio(10),
  },
  textBtnAdd: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    lineHeight: lineHeightByRatio(30),
    color: BASE_COLORS.gunmetalColor,
  },
  selectedContainer: {
    ...GlobalStyles.mt15,
    width: '95%',
  },
  btnDone: {
    ...GlobalStyles.mt15,
    ...GlobalStyles.ph40,
    ...GlobalStyles.pv15,
    backgroundColor: BASE_COLORS.oxleyColor,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: adjust(100),
  },
  titleStyle: {
    fontFamily: 'Montserrat-SemiBold',
    lineHeight: PixelRatio.roundToNearestPixel(adjust(BASE_STYLES.h4)),
    fontWeight: '600',
    color: BASE_COLORS.whiteColor,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
});
