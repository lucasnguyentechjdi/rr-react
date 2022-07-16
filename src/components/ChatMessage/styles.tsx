import {StyleSheet} from 'react-native';
import {adjust} from '~Root/utils';

const styles = {
  left: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      marginLeft: 8,
      marginRight: 0,
      marginBottom: 10,
    },
  }),
  right: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      marginLeft: 0,
      marginRight: 8,
      marginBottom: 10,
    },
  }),
  imageProfile: {
    width: adjust(40),
    height: adjust(40),
    borderRadius: adjust(80),
    marginRight: 10,
  },
};

export default styles;
