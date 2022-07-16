import {Dimensions, PixelRatio, Platform, StyleSheet} from 'react-native';
import {BASE_COLORS, GlobalStyles, HEADER} from '~Root/config';
import { adjust } from '~Root/utils';

const screenHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  header: {
    paddingVertical: 3,
    paddingHorizontal: 20,
    backgroundColor: BASE_COLORS.gray90Color,
    overflow: 'hidden',
  },
  row: {
    borderBottomColor: BASE_COLORS.lighGray,
    borderBottomWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 20,
    height: 50,
  },
  sideFilter: {
    position: 'absolute',
    right: 0,
    top: 90,
    bottom: 20,
    width: 50,
    zIndex: 2,
    textAlign: 'center',
    maxHeight: screenHeight - PixelRatio.roundToNearestPixel(HEADER.Header.SM) - 30,
  },
  sideFilterText: {
    marginBottom: screenHeight > 700 ? 4 : 2,
    fontSize: screenHeight > 700 ? 15 : 13,
    color: '#4375da',
  },
  emailText: {
    fontSize: 12,
  },
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
