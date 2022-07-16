import { BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles } from '~Root/config';
import { Dimensions, StyleSheet } from 'react-native';

import { adjust } from '~Root/utils';

export default StyleSheet.create({
  btnSkip: {
    ...GlobalStyles.ph10,
    ...GlobalStyles.pv2,
    ...GlobalStyles.mb10,
    borderRadius: 100,
    alignSelf: 'flex-end',
    backgroundColor: BASE_COLORS.grayX11Color,
  },
  btnPrev: {
    ...GlobalStyles.ph10,
    ...GlobalStyles.pv2,
    ...GlobalStyles.mb10,
    borderRadius: 100,
    alignSelf: 'flex-start',
    backgroundColor: BASE_COLORS.grayX11Color,
  },
  buttonRow: {
    justifyContent: 'space-between',
  },
  textStyle: {
    color: BASE_COLORS.eerieBlackColor,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    fontSize: adjust(12),
    textTransform: 'uppercase',
  },
  text: {
    lineHeight: adjust(18),
  },
  textInformation: {
    maxHeight: 140,
    overflow: 'hidden',
  },
  btnGroup: {
    ...GlobalStyles.flexRow,
    flex: 1,
    position: 'absolute',
    bottom: -15,
    left: (Dimensions.get('window').width - adjust(75 + 75 + 20 + 20)) / 2,
  },
  btnCircle: {
    backgroundColor: BASE_COLORS.oxleyColor,
    borderRadius: adjust(100),
    borderWidth: 1,
    borderColor: BASE_COLORS.whiteColor,
    width: adjust(75),
    height: adjust(75),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    fontSize: adjust(10),
    color: BASE_COLORS.whiteColor,
  },
  reportContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-start',
    position: 'absolute',
    bottom: 70,
  },
  textReport: {
    fontSize: adjust(10),
    textTransform: 'uppercase',
  },
  imageProfileContainer: {
    width: adjust(80),
    height: adjust(80),
    borderRadius: adjust(130),
    overflow: 'hidden',
  },
  imageProfile: {
    width: '100%',
    height: '100%',
  },
  tagStyleContainer: {
    borderRadius: 10,
    backgroundColor: BASE_COLORS.aeroColor,
    fontFamily: BASE_FONTS.semiBold,
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  tagStyle: {
    color: BASE_COLORS.eerieBlackColor,
    textTransform: 'capitalize',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  askContent: {
    overflow: 'scroll',
    display: 'flex',
    maxHeight: 150,
    backgroundColor: '#000000',
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  textNormal: {
    fontFamily: BASE_FONTS.medium,
    fontSize: adjust(BASE_STYLES.h5),
    lineHeight: 24,
    color: BASE_COLORS.whiteColor,
  },
  textBold: {
    fontFamily: BASE_FONTS.bold,
    fontSize: adjust(BASE_STYLES.h5),
    lineHeight: 24,
    color: BASE_COLORS.whiteColor,
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 0.9,
    alignItems: 'center',
    marginRight: 20,
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 0.9,
    alignItems: 'center',
  },
});
