import {BASE_COLORS, BASE_FONTS, GlobalStyles} from '~Root/config';
import {PixelRatio, StyleSheet} from 'react-native';

import {adjust} from '~Root/utils';

export default StyleSheet.create({
  title: {
    ...GlobalStyles.textUppercase,
  },
  styleModal: {
    ...GlobalStyles.pt15,
    flex: 0.25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  styleModalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
    flex: 1,
  },
  iconStyle: {
    ...GlobalStyles.mr5,
  },
  textStyle: {
    ...GlobalStyles.p,
    fontFamily: BASE_FONTS.semiBold,
    color: BASE_COLORS.steelBlueColor,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  buttonGroup: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  mainButtonContainer: {
    alignItems: 'center',
    flex: 1,
  },
  mainButtonTextStyle: {
    ...GlobalStyles.h5,
    ...GlobalStyles.mainButtonTextStyle,
    alignSelf: 'center',
  },
  mainButtonArea: {
    ...GlobalStyles.mainButtonArea,
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
    width: '100%',
  },
  h5BoldDefault: {
    ...GlobalStyles.h5,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.eerieBlackColor,
  },
});
