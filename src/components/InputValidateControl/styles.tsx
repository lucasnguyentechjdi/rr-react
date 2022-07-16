import { StyleSheet } from 'react-native';
import { BASE_COLORS, GlobalStyles } from '~Root/config';
import { adjust } from '~Root/utils';

export default StyleSheet.create({
  container: {
    marginBottom: adjust(15),
  },
  textInputContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: adjust(24),
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: adjust(3),
    paddingHorizontal: adjust(13),
    width: '100%',
  },
  labelStyle: {
    color: BASE_COLORS.whiteColor,
  },
  inputStyle: {
    borderColor: BASE_COLORS.whiteColor,
    borderWidth: 1,
    borderRadius: adjust(16),
    paddingVertical: adjust(12),
    paddingHorizontal: adjust(12),
    color: BASE_COLORS.whiteColor,
  },
  inputErrorStyle: {
    borderColor: BASE_COLORS.redColor,
  },
  textError: {
    ...GlobalStyles.mt10,
    color: BASE_COLORS.redColor,
  },
});
