import {StyleSheet} from 'react-native';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  modalHeader: {
    ...GlobalStyles.mb20,
  },
  inputContainer: {
    ...GlobalStyles.ph10,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(229, 229, 229, 0.46);',
    borderRadius: adjust(10),
    alignItems: 'center',
  },
  input: {
    ...GlobalStyles.h5,
    fontWeight: '600',
    flex: 1,
    lineHeight: adjust(17),
    color: BASE_COLORS.gunmetalColor,
  },
});
