import moment from 'moment';
import React from 'react';
import {StyleSheet, Text, View, TextStyle} from 'react-native';
import {IMessage} from '~Root/services/chat/types';
import color from './color';

const containerStyle = {
  marginLeft: 10,
  marginRight: 10,
  marginBottom: 5,
};

const textStyle = {
  fontSize: 10,
  backgroundColor: 'transparent',
  textAlign: 'right',
};

const styles = {
  left: StyleSheet.create({
    container: {
      ...containerStyle,
    },
    text: {
      fontWeight: '600',
      color: color.white,
      ...textStyle,
    },
  }),
  right: StyleSheet.create({
    container: {
      ...containerStyle,
    },
    text: {
      fontWeight: '600',
      color: color.white,
      ...textStyle,
    },
  }),
};
interface Props {
  item: IMessage;
  position: 'left' | 'right';
}
const Time = ({item, position}: Props) => {
  return (
    <View style={[styles[position].container]}>
      <Text style={[styles[position].text] as TextStyle}>{moment(item.createdAt).fromNow()}</Text>
    </View>
  );
};

export default React.memo(Time);
