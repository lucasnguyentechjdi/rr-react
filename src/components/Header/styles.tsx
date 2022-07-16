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
  contentLeftSecond: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  titleContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    ...GlobalStyles.h5,
    lineHeight: 15,
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
  contentRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingRight: 20,
    height: '100%',
  },
  contentRightSecond: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingRight: 10,
    height: '100%',
  },
  right: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  flexRow: {
    flexDirection: 'row',
    flex: 1,
  },
  iconLeftSecond: {
    justifyContent: 'flex-end',
    marginLeft: -7,
    marginBottom: 11,
  },
});
