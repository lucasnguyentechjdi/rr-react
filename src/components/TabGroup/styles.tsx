import {StyleSheet} from 'react-native';
import {adjust} from '~Root/utils';
import {BASE_FONTS} from '~Root/config';

const mainColor = '#347FAD';
const borderBottomColor = '#BDC3CB';

export default StyleSheet.create({
  tabContainer: {
    paddingVertical: 0,
  },
  tabToolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: borderBottomColor,
  },
  toolbarTitle: {
    paddingTop: adjust(4),
    paddingBottom: adjust(4),
    paddingLeft: adjust(16),
    paddingRight: adjust(16),
    color: mainColor
  },
  toolbarText: {
    fontFamily: BASE_FONTS.semiBold,
    fontSize: 14,
    fontWeight: '400'
  },
  active: {
    borderBottomWidth: 2,
    borderBottomColor: mainColor
  },
  activeText: {
    color: mainColor,
    fontWeight: '600',
  }

});
