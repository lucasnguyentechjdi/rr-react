import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {IMessage} from '~Root/services/chat/types';
import {imageUrl} from '~Root/services/upload';
import {IGlobalState} from '~Root/types';
import Image from '../Image';
import Bubble from './bubble';
import styles from './styles';

interface Props {
  item: IMessage;
  isSameUser: boolean;
}

const ChatMessage = ({item, isSameUser}: Props) => {
  const position = isSameUser ? 'right' : 'left';

  const renderBubble = () => {
    return <Bubble item={item} position={position} />;
  };

  return (
    <View style={[styles[position].container]}>
      {/* {!isSameUser ? renderAvatar() : null} */}
      {renderBubble()}
    </View>
  );
};

export default React.memo(ChatMessage);
