import { BASE_COLORS, BASE_FONTS, GlobalStyles } from '~Root/config';
import { PixelRatio, StyleSheet } from 'react-native';
import { adjust, headerByRatio } from '~Root/utils';

const ratio = headerByRatio();

export default StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
  areaViewContainer: {
    marginTop: ratio?.marginTop,
    flex: 1,
  },
  btnSecond: {
    borderColor: BASE_COLORS.whiteColor,
  },
  titleStyle: {
    color: BASE_COLORS.whiteColor,
  },
  title: {
    fontSize: 16,
  },
  biztype: {
    fontSize: 14,
    flexWrap: 'wrap',
  },
  limitWidth: {
    width: '60%',
  },
  headerContent: {
    height: '100%',
    width: '100%',
    justifyContent: 'center'
  },
  headerWrapper: {
    alignItems: 'center',
  },
  userInfoArea: {
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  userInfoWidth: {
    flex: 8,
  },
  imageProfile: {
    width: adjust(80),
    height: adjust(80),
    borderRadius: adjust(160),
  },
  styleModal: {
    ...GlobalStyles.ph15,
    ...GlobalStyles.pt15,
    flex: 0.2,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  styleModalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  buttonGroup: {
    flex: 1,
    justifyContent: 'center',
  },
  cancelButtonArea: {
    ...GlobalStyles.mainButtonArea,
    ...GlobalStyles.mr10,
    backgroundColor: BASE_COLORS.indianRedColor,
  },
  textAreaStyle: {
    ...GlobalStyles.h5,
    ...GlobalStyles.mb5,
    borderColor: BASE_COLORS.blackColor,
    borderWidth: 1,
    color: BASE_COLORS.blackColor,
    textAlign: 'center',
    alignSelf: 'center',
  },
  labelStyle: {
    ...GlobalStyles.h3,
    ...GlobalStyles.mb10,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: 'bold',
  },
  textStyle: {
    ...GlobalStyles.h5,
    ...GlobalStyles.mainButtonTextStyle,
  },
  mainButtonArea: {
    ...GlobalStyles.mainButtonArea,
  },
  mainButtonTextStyle: {
    ...GlobalStyles.h5,
    ...GlobalStyles.mainButtonTextStyle,
    alignSelf: 'center',
  },
  scrollViewWhite: {
    marginVertical: 0,
  },
  logoutIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
});
