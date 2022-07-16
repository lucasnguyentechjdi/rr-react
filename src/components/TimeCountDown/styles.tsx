import {StyleSheet} from 'react-native';
import {BASE_COLORS} from '~Root/config';
import {adjust} from '../../utils';

export default StyleSheet.create({
  countDownContainer: {
    alignSelf: 'center',
    paddingHorizontal: adjust(20),
    paddingVertical: adjust(10),
    borderWidth: 1,
    borderColor: BASE_COLORS.tertiary,
    borderRadius: adjust(14),
  },
});
