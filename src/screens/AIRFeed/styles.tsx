import { BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles } from '~Root/config';
import { Dimensions, StyleSheet } from 'react-native';

import { adjust } from '~Root/utils';

export default StyleSheet.create({
  backgroundHeaderWhite: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '48%',
    backgroundColor: BASE_COLORS.whiteColor,
    width: '200%',
  },
  filterPoint: {
    width: 13,
    height: 13,
    borderRadius: 26,
    backgroundColor: BASE_COLORS.oxleyColor,
    marginLeft: 10,
  },
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
  filterGroup: {
    ...GlobalStyles.flexRow,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  reportGroup: {
    ...GlobalStyles.flexRow,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  btnGroup: {
    ...GlobalStyles.flexRow,
    flex: 1,
    position: 'absolute',
    bottom: -15,
    zIndex: 99,
    left: (Dimensions.get('window').width - adjust(75 + 75 + 20 + 20)) / 2,
  },
  btnCircle: {
    backgroundColor: BASE_COLORS.gray,
    borderRadius: adjust(100),
    borderWidth: 1,
    borderColor: BASE_COLORS.whiteColor,
    width: adjust(44),
    height: adjust(44),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnIntroduce: {
    backgroundColor: BASE_COLORS.oxleyColor,
    borderRadius: adjust(22),
    borderWidth: 1,
    borderColor: BASE_COLORS.timberWolfColor,
    justifyContent: 'center',
    alignItems: 'center',
    height: adjust(44),
    paddingLeft: adjust(25),
    paddingRight: adjust(25),
    paddingTop: adjust(5),
    paddingBottom: adjust(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  filterText: {
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 13,
    color: BASE_COLORS.blackColor,
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
  filterRow: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: BASE_COLORS.whiteColor,
  },
  reportButton: {
    borderRadius: 20,
    backgroundColor: BASE_COLORS.whiteColor,
    paddingLeft: adjust(10),
    paddingRight: adjust(10),
    paddingTop: adjust(4),
    paddingBottom: adjust(4),
    color: BASE_COLORS.oxleyColor,
    borderColor: BASE_COLORS.oxleyColor,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prevSide: {
    ...GlobalStyles.mr15,
    height: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 30,
    backgroundColor: BASE_COLORS.steelBlue,
    width: 25,
  },
  prevSideHide: {
    width: 25,
    opacity: 0,
  },
  prevSideTop: {
    backgroundColor: BASE_COLORS.lightBlue,
    height: '37%',
    width: '100%',
  },
  prevIcon: {
    marginLeft: 8,
  },
  nextSide: {
    marginLeft: 15,
    height: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: BASE_COLORS.steelBlue,
    width: 25,
  },
  nextSideHide: {
    width: 25,
    opacity: 0,
  },
  nextSideTop: {
    backgroundColor: BASE_COLORS.lightBlue,
    height: '37%',
    width: '100%',
  },
  nextIcon: {
    marginLeft: 6,
  },
  textBtnFilter: {
    fontSize: adjust(11),
    fontWeight: '600',
    color: BASE_COLORS.oxleyColor,
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
  askBlock: {
    ...GlobalStyles.flexColumn,
    ...GlobalStyles.mt10,
  },
  askContentBlock: {
    backgroundColor: BASE_COLORS.steelBlue,
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
