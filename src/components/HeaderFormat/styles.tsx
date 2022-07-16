import {StyleSheet} from 'react-native';

import {GlobalStyles} from '~Root/config';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contain: {
    flexDirection: 'row',
  },
  widthFull: {
    width: '100%',
  },
  contentLeft: {
    justifyContent: 'flex-start',
  },
  titleContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    ...GlobalStyles.h2,
    fontWeight: '600',
  },
  subTitle: {
    ...GlobalStyles.h2,
    fontWeight: '600',
    lineHeight: 32,
  },
  contentCenter: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  iconLeftSecond: {
    justifyContent: 'flex-end',
    marginLeft: -7,
    marginBottom: 11,
  },
});
