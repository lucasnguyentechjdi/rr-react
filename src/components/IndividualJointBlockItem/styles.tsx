import {StyleSheet} from 'react-native';

import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  checkBoxContainer: {
    ...GlobalStyles.mv20,
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
  imageProfileContainer: {
    width: adjust(65),
    height: adjust(65),
    borderRadius: adjust(130),
    overflow: 'hidden',
    zIndex: 10,
  },
  imageProfileContainerOverlap: {
    marginLeft: adjust(-15),
    width: adjust(65),
    height: adjust(65),
    borderRadius: adjust(130),
    overflow: 'hidden',
  },
  imageProfile: {
    width: '100%',
    height: '100%',
  },
  styleContainer: {
    width: '100%',
  },
  inputStyle: {
    ...GlobalStyles.pv15,
    color: BASE_COLORS.primary,
    fontSize: adjust(BASE_STYLES.h5),
  },
  inputBorderStyle: {
    ...GlobalStyles.mt10,
    ...GlobalStyles.p10,
    borderColor: BASE_COLORS.grayColor,
    borderWidth: 1,
    color: BASE_COLORS.primary,
    fontSize: adjust(BASE_STYLES.h5),
    width: '100%',
    textAlign: 'center',
  },
  inputErrorStyle: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: BASE_COLORS.redColor,
  },
  labelStyle: {
    fontFamily: BASE_FONTS.semiBold,
    fontSize: adjust(BASE_STYLES.h5),
    color: BASE_COLORS.primary,
  },
  textColor: {
    color: BASE_COLORS.tealBlueColor,
  },
  disableContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: BASE_COLORS.whiteColor,
    opacity: 0.4,
    zIndex: 10,
  },
});
