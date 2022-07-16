import {StyleSheet} from 'react-native';
import {BASE_COLORS} from '~Root/config';
import {paddingByRatio} from '~Root/utils';

export default StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  textInputContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 24,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 3,
    paddingHorizontal: 13,
    width: '100%',
  },
  labelStyle: {
    color: BASE_COLORS.whiteColor,
  },
  inputStyle: {
    borderColor: BASE_COLORS.whiteColor,
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: paddingByRatio(12),
    paddingHorizontal: paddingByRatio(12),
    color: BASE_COLORS.whiteColor,
  },
  inputErrorStyle: {
    borderColor: BASE_COLORS.redColor,
  },
  textError: {
    color: BASE_COLORS.redColor,
    marginTop: 10,
  },
});
