import React from 'react';
import {View, TouchableOpacity, GestureResponderEvent, ViewStyle, TextStyle} from 'react-native';

import {Icon, Paragraph} from '~Root/components';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';
import styles from './styles';
import {CHAT_MEMBER_ROLE, CHAT_MEMBER_STATUS, CHAT_STATUS, CHAT_TYPE, IChat} from '~Root/services/chat/types';
import {askTitleOneLine, checkAskIsEnd} from '~Root/services/ask/actions';
import moment from 'moment';
import UserAvatar from '../UserAvatar';
import {IGlobalState} from '~Root/types';
import {useSelector} from 'react-redux';

interface Props {
  style?: ViewStyle & TextStyle;
  styleRow?: ViewStyle & TextStyle;
  tagStyleContainer?: ViewStyle;
  tagStyle?: TextStyle;
  onPress?: (event: GestureResponderEvent) => void;
  item: IChat;
}

const ListItemChat: React.FC<Props> = ({style = {}, tagStyle = {}, onPress = () => {}, item}: Props) => {
  const {userInfo} = useSelector((state: IGlobalState) => state.userState);
  const currentUser = item.members.find(member => member.userCode === userInfo.code);
  const roleShowInfo =
    currentUser?.role === CHAT_MEMBER_ROLE.ASKER ? CHAT_MEMBER_ROLE.RESPONDER : CHAT_MEMBER_ROLE.ASKER;
  const getAsker = () => {
    if (item.type === CHAT_TYPE.GENERAL) {
      return item.members.find(member => member.role === CHAT_MEMBER_ROLE.USER && member.userCode !== userInfo.code);
    }
    return item.members.find(member => member.role === roleShowInfo);
  };
  const asker = getAsker();

  const getBorderLeftStyle = () => {
    if (item.type === CHAT_TYPE.NETWORK) return styles.network;
    if (item.type === CHAT_TYPE.EXIST_USER) return styles.existUser;
    if (item.type === CHAT_TYPE.NEW_USER) return styles.newUser;
    return styles.network;
  };

  const renderTime = () => {
    const itemDate = moment(item.updatedAt);
    if (itemDate.isSame(moment(), 'day')) {
      return `Today ${itemDate.format('h:mma')}`;
    }
    if (itemDate.isSame(moment().subtract(1, 'days'), 'day')) {
      return `Yesterday ${itemDate.format('h:mma')}`;
    }
    if (itemDate.diff(moment(), 'days') < 365) {
      return itemDate.format('DD/MM h:mma');
    }
    return itemDate.format('MM/YY h:mma');
  };

  const getLastMessage = () => {
    if (item.type === CHAT_TYPE.GENERAL) {
      return item.lastMessage ?? '';
    }
    if (item.ask && checkAskIsEnd(item.ask)) {
      return `(System) Chat Closed. User Has Ended the Ask`;
    }
    if (item.lastMessage) return item.lastMessage;
    if (item.status === CHAT_STATUS.PENDING && currentUser?.role === CHAT_MEMBER_ROLE.INTRODUCER) {
      return `(System) New Introduction from You`;
    }
    if (currentUser?.role === CHAT_MEMBER_ROLE.INTRODUCER) {
      return `(System) New Introduction Awaiting For Your Response`;
    }
    const totalPending = item.members.filter(member => member.status === CHAT_MEMBER_STATUS.PENDING).length;
    if (item.status === CHAT_STATUS.PENDING && totalPending > 1) {
      return '(System) New Introduction Awaiting For Your Response';
    }
    if (item.status === CHAT_STATUS.PENDING && totalPending === 1) {
      return '(System) Pending Introduction Approval From The Other Party';
    }
    return '(System) Chat Established. Both Parties Have Agreed to Connect';
  };

  return (
    <TouchableOpacity style={[styles.contain, style]} onPress={onPress}>
      <View style={[GlobalStyles.flexRow, styles.itemContainer, getBorderLeftStyle()]}>
        <View style={styles.imageContainer}>
          <UserAvatar user={asker?.user} size={55} imageSize={60} />
        </View>
        <View style={[GlobalStyles.flexColumn, styles.contentContainer]}>
          {item.type !== CHAT_TYPE.GENERAL ? (
            <>
              {item.ask && checkAskIsEnd(item.ask) ? (
                <View style={[styles.rightContainer, styles.askEndLabel, GlobalStyles.flexRow]}>
                  <Paragraph textWhite bold title={'Ask Ended'} style={[styles.textRight, GlobalStyles.mr5]} />
                </View>
              ) : (
                <View style={[styles.rightContainer, GlobalStyles.flexRow]}>
                  <Paragraph textWhite bold title={item.label} style={[styles.textRight, GlobalStyles.mr5]} />
                  <Icon name='arrow-right' size={adjust(8)} color={BASE_COLORS.whiteColor} />
                </View>
              )}
            </>
          ) : (
            <View style={[styles.rightContainerEmpty, GlobalStyles.flexRow]}>
              <Paragraph textWhite bold title={' '} style={[styles.textRight, GlobalStyles.mr5]} />
            </View>
          )}
          <View style={GlobalStyles.flexRow}>
            <View style={styles.contentArea}>
              <Paragraph
                p
                title={item.type === CHAT_TYPE.GENERAL ? 'Private Chat' : askTitleOneLine(item.ask)}
                numberOfLines={1}
                style={[
                  GlobalStyles.tagStyle,
                  GlobalStyles.mt30,
                  GlobalStyles.mb10,
                  GlobalStyles.textUppercase,
                  styles.askTitle,
                  tagStyle,
                ]}
              />
              <Paragraph
                p
                title={`${asker?.user?.firstName ?? ''} ${asker?.user?.lastName ?? ''}`}
                numberOfLines={1}
                style={styles.titleBlackBold}
              />
              <Paragraph p title={getLastMessage()} numberOfLines={2} />
            </View>
            <View style={[GlobalStyles.flexColumn, GlobalStyles.itemCenter, GlobalStyles.mr10]}>
              {currentUser?.newMessageCount && currentUser?.newMessageCount > 0 ? (
                <View style={styles.count}>
                  <Paragraph p textWhite title={`${currentUser?.newMessageCount?.toString()}`} numberOfLines={1} />
                </View>
              ) : (
                <View style={styles.emptyCount} />
              )}
            </View>
          </View>
          <View style={[GlobalStyles.fullWidth, styles.bottomLine]}>
            <Paragraph p textOxleyColor title={renderTime()} numberOfLines={1} style={styles.timeLabel} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItemChat;
