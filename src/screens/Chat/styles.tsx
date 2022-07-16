import {StyleSheet, Platform} from 'react-native';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  searchContainer: {
    borderBottomColor: BASE_COLORS.eerieBlackColor,
    borderBottomWidth: 1,
  },
  inputContainer: {
    ...GlobalStyles.mh15,
    ...GlobalStyles.mv15,
    ...GlobalStyles.ph10,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: BASE_COLORS.greyColor,
    borderRadius: adjust(20),
    width: '90%',
    paddingVertical: Platform.OS === 'ios' ? adjust(10) : 0,
    alignItems: 'center',
  },
  iconSearch: {
    ...GlobalStyles.mr10,
  },
  input: {
    ...GlobalStyles.h5,
    fontWeight: '600',
    flex: 1,
    lineHeight: adjust(17),
    color: BASE_COLORS.gunmetalColor,
  },
});
