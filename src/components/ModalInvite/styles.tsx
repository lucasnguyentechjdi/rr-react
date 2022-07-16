import {BASE_COLORS} from './../../config/theme';
import {GlobalStyles} from '~Root/config';
import {StyleSheet} from 'react-native';
import {adjust} from '~Root/utils';
import {ratioButton} from '~Root/config/styles';

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    ...GlobalStyles.mainButtonContainer,
    bottom: '35%',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: BASE_COLORS.blackColor,
    backgroundColor: BASE_COLORS.whiteColor,
    textAlign: 'center',
    width: '40%',
  },
  option: {
    paddingVertical: adjust(16),
  },
  borderBottomOption: {
    borderBottomWidth: 1,
    borderBottomColor: BASE_COLORS.blackColor,
  },
  text: {},
});
