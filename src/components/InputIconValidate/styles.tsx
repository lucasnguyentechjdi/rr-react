import {StyleSheet} from 'react-native';
import {BASE_COLORS} from '~Root/config';

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
  textInputWrapper: {
    borderColor: BASE_COLORS.whiteColor,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    color: BASE_COLORS.whiteColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelStyle: {
    color: BASE_COLORS.whiteColor,
  },
  inputStyle: {
    flex: 1,
  },
  inputErrorStyle: {
    borderColor: BASE_COLORS.redColor,
  },
  textError: {
    color: BASE_COLORS.redColor,
    marginTop: 10,
  },
});
