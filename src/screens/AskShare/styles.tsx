import { BASE_COLORS, BASE_FONTS, GlobalStyles } from '~Root/config';
import { Dimensions, StyleSheet } from 'react-native';

import { adjust } from '~Root/utils';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
  scrollView: {
    backgroundColor: BASE_COLORS.whiteColor,
    marginTop: 0,
    zIndex: -1,
    paddingTop: 0,
    flex: 1,
  },
  contentContainerStyle: {
    ...GlobalStyles.ph20,
  },
  editButton: {
    flex: 1,
    alignItems: 'flex-end',
  },
  underlineCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderBottom: {
    borderBottomColor: BASE_COLORS.oldSilverColor,
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 0.8,
    overflow: 'hidden',
  },
  title: {
    flex: 0.9,
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 0.8,
  },
  buttonGroup: {
    ...GlobalStyles.mv20,
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainerStyle: {
    ...GlobalStyles.flexRow,
    ...GlobalStyles.mb15,
    ...GlobalStyles.pv15,
    borderWidth: 1,
    borderColor: BASE_COLORS.blackColor,
    borderRadius: adjust(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  h5BoldDefault: {
    ...GlobalStyles.h5,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.eerieBlackColor,
  },
  tagStyleContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    display: 'flex',
    backgroundColor: BASE_COLORS.aeroColor,
  },
  tagStyle: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.eerieBlackColor,
    width: '100%',
  },
  textUnderlineArea: {
    ...GlobalStyles.ph15,
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  text: {
    lineHeight: adjust(24),
  },
  reportContainer: {
    alignSelf: 'flex-end',
  },
  buttonGroupMain: {
    width: '100%',
    justifyContent: 'space-between',
  },
  buttonContainerHalfStyle: {
    ...GlobalStyles.flexRow,
    ...GlobalStyles.pv10,
    ...GlobalStyles.ph15,
    ...GlobalStyles.mb15,
    borderWidth: 1,
    borderColor: BASE_COLORS.blackColor,
    borderRadius: adjust(24),
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 2 - adjust(25),
  },
});
