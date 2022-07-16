import React from 'react';
import {Text, StyleSheet, View, ViewStyle, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {IMessage} from '~Root/services/chat/types';
import Images from 'react-native-chat-images';
import {IGlobalState} from '~Root/types';
import Paragraph from '../Paragraph';
import color from './color';
import Time from './time';
import {imageUrl} from '~Root/services/upload';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = {
  left: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
    },
    wrapper: {
      borderRadius: 20,
      backgroundColor: '#4683AEBF',
      marginRight: 60,
      minHeight: 20,
      justifyContent: 'flex-end',
      minWidth: '50%',
    },
    containerToNext: {
      borderBottomLeftRadius: 3,
    },
    containerToPrevious: {
      borderTopLeftRadius: 3,
    },
    bottom: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    text: {
      color: 'white',
      padding: 10,
    },
  }),
  right: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-end',
    },
    wrapper: {
      position: 'relative',
      borderRadius: 20,
      backgroundColor: '#679C79BF',
      marginLeft: 60,
      minHeight: 20,
      justifyContent: 'flex-end',
      minWidth: '50%',
    },
    containerToNext: {
      borderBottomRightRadius: 3,
    },
    containerToPrevious: {
      borderTopRightRadius: 3,
    },
    bottom: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    text: {
      color: 'white',
      padding: 10,
    },
  }),
  content: StyleSheet.create({
    tick: {
      fontSize: 10,
      backgroundColor: 'transparent',
      color: '#ffffff',
    },
    tickView: {
      flexDirection: 'row',
      marginRight: 10,
    },
    username: {
      top: -3,
      left: 0,
      fontSize: 12,
      backgroundColor: 'transparent',
      color: color.white,
    },
    usernameView: {
      flexDirection: 'row',
      marginHorizontal: 10,
    },
  }),
};

interface Props {
  item: IMessage;
  position: 'left' | 'right';
}

const Bubble = ({item, position}: Props) => {
  const {chatInfo} = useSelector((state: IGlobalState) => state.chatState);
  const userInfo = chatInfo?.members.find(member => member.userCode === item.userCode);

  const renderTime = () => {
    return <Time item={item} position={position} />;
  };

  const attachmentMessage = (length: number): ViewStyle => ({
    position: 'relative',
    width: length > 3 ? (Dimensions.get('window').width * 3) / 4 : length * (Dimensions.get('window').width / 4),
    backgroundColor: 'transparent',
  });

  const renderUsername = () => {
    if (position === 'right') return null;
    return (
      <View style={styles.content.usernameView}>
        <Text style={[styles.content.username]}>
          {userInfo?.user.firstName} {userInfo?.user.lastName}
        </Text>
      </View>
    );
  };

  const renderBubbleContent = () => {
    if (item.attachments && item.attachments.length > 0) {
      const images = item.attachments.map((attachment: string) => imageUrl(attachment));
      return (
        <View style={attachmentMessage(images.length)}>
          <SafeAreaView edges={['top', 'right', 'left']}>
            <Images images={images} />
          </SafeAreaView>
        </View>
      );
    }
    return <Paragraph title={item.message} style={[styles[position].text]} />;
  };

  return (
    <View style={[styles[position].container]}>
      <View style={[styles[position].wrapper]}>
        {renderBubbleContent()}
        <View style={[styles[position].bottom]}>
          {renderUsername()}
          {renderTime()}
        </View>
      </View>
    </View>
  );
};

export default React.memo(Bubble);
