import {PixelRatio, StyleSheet} from 'react-native';

import {BASE_COLORS, BASE_FONTS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

const calcFont = (value: number) => {
  const pixelRatio = PixelRatio.get();
  if (pixelRatio > 2) {
    return (value / 100) * 75;
  }
  return value;
};

export default StyleSheet.create({
  contain: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    flexWrap: 'wrap',
    backgroundColor: BASE_COLORS.whiteColor,
    borderBottomWidth: 1,
    borderBottomColor: BASE_COLORS.eerieBlackColor,
    marginBottom: 1,
    paddingTop: 1,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  contentArea: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    padding: 10,
    flex: 1,
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: BASE_COLORS.whiteColor,
    marginTop: adjust(-30),
    paddingBottom: 0,
  },
  rightContainer: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: BASE_COLORS.oxleyColor,
    borderBottomLeftRadius: adjust(10),
    paddingHorizontal: adjust(10),
    paddingVertical: adjust(5),
    zIndex: 10,
  },
  rightContainerEmpty: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderBottomLeftRadius: adjust(10),
    paddingHorizontal: adjust(10),
    paddingVertical: adjust(5),
    zIndex: 10,
  },
  leftContainer: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: BASE_COLORS.oxleyColor,
    borderBottomLeftRadius: adjust(10),
    paddingHorizontal: adjust(10),
    paddingVertical: adjust(5),
    zIndex: 10,
  },
  askEndLabel: {
    backgroundColor: BASE_COLORS.redColor,
  },
  itemContainer: {
    flex: 1,
    borderLeftWidth: adjust(13),
    overflow: 'hidden',
  },
  network: {
    borderLeftColor: BASE_COLORS.tealBlueColor,
  },
  existUser: {
    borderLeftColor: BASE_COLORS.oxleyColor,
  },
  newUser: {
    borderLeftColor: BASE_COLORS.spanishGrayColor,
  },
  imageContainer: {
    justifyContent: 'center',
    padding: adjust(4),
  },
  textRight: {
    fontFamily: BASE_FONTS.regular,
    fontSize: adjust(calcFont(10)),
  },
  title: {
    fontFamily: BASE_FONTS.regular,
    fontSize: adjust(calcFont(10)),
  },
  askTitle: {
    fontSize: adjust(calcFont(12)),
  },
  titleBlackBold: {
    fontFamily: BASE_FONTS.regular,
    fontSize: adjust(calcFont(12)),
    color: BASE_COLORS.blackColor,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  count: {
    ...GlobalStyles.ph5,
    borderRadius: adjust(8),
    backgroundColor: BASE_COLORS.oxleyColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  timeLabel: {
    marginTop: 5,
    textAlign: 'right',
    width: '100%',
  },
  emptyCount: {
    marginBottom: 34,
  },
  bottomLine: {
    marginBottom: 20,
    paddingRight: 10,
  },
});
