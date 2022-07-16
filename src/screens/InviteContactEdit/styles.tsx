import {StyleSheet} from 'react-native';

import {BASE_COLORS, BASE_FONTS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  description: {
    color: BASE_COLORS.steelBlueColor,
    alignSelf: 'center',
  },
  blockGrey: {
    alignItems: 'center',
  },
  buttonGroup: {
    ...GlobalStyles.flexColumn,
  },
  mainButtonArea: {
    ...GlobalStyles.mainButtonArea,
    ...GlobalStyles.mb10,
    ...GlobalStyles.mh15,
    alignItems: 'center',
  },
  modalMainButtonArea: {
    ...GlobalStyles.mainButtonArea,
    alignItems: 'center',
  },
  textNotes: {
    fontSize: adjust(9),
    ...GlobalStyles.mb15,
  },
  cancelButtonArea: {
    ...GlobalStyles.mainButtonArea,
    ...GlobalStyles.mb10,
    ...GlobalStyles.mh15,
    backgroundColor: BASE_COLORS.indianRedColor,
    alignItems: 'center',
  },
  modalCancelButtonArea: {
    ...GlobalStyles.mainButtonArea,
    ...GlobalStyles.mr10,
    backgroundColor: BASE_COLORS.indianRedColor,
    alignItems: 'center',
  },
  textStyle: {
    ...GlobalStyles.h5,
    ...GlobalStyles.mainButtonTextStyle,
  },
  content: {
    fontFamily: BASE_FONTS.semiBold,
  },
  modalHeader: {
    ...GlobalStyles.modalHeader,
    ...GlobalStyles.mb15,
  },
  header: {
    ...GlobalStyles.mb10,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    textAlign: 'center',
  },
});
