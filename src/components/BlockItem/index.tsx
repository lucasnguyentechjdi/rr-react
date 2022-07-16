import React from 'react';
import { useTranslation } from 'react-i18next';
import { GestureResponderEvent, TouchableOpacity, View, ViewStyle } from 'react-native';

import Toast from 'react-native-toast-message';
import { Icon, Paragraph } from '~Root/components';
import { BASE_COLORS, GlobalStyles } from '~Root/config';
import ChatAPI from '~Root/services/chat/apis';
import { IChat } from '~Root/services/chat/types';
import { INVITE_STATUS } from '~Root/services/invite/types';
import { IUser } from '~Root/services/user/types';
import { adjust } from '~Root/utils';
import UserAvatar from '../UserAvatar';
import styles from './styles';

interface Props {
  id?: string;
  name?: string;
  email?: string;
  user?: IUser | null;
  myself?: any;
  profile_photo?: string | null;
  status?: string;
  phoneNumber?: string;
  countryCode?: string;
  showConfirm: boolean;
  style?: ViewStyle;
  isSuggest?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  onConfirm?: (event: GestureResponderEvent) => void;
  onPending?: (event: GestureResponderEvent) => void;
  onChat?: (chatInfo: IChat) => void;
  onAddSuggest?: (event: GestureResponderEvent) => void;
  onRejectSuggest?: (event: GestureResponderEvent) => void;
}

const BlockItem: React.FC<Props> = ({
  name = '',
  myself,
  profile_photo,
  status = '',
  email = '',
  phoneNumber,
  countryCode = '',
  showConfirm = false,
  user = null,
  style = {},
  isSuggest = false,
  onPress = () => { },
  onConfirm = () => { },
  onPending = () => { },
  onChat = () => { },
  onAddSuggest = () => { },
  onRejectSuggest = () => { },
}: Props) => {
  const { t } = useTranslation();

  const onPressChat = async () => {
    if (!user) return;
    const result = await ChatAPI.createGeneralChat(user.code);
    if (!result.success || !result.data) {
      Toast.show({
        position: 'bottom',
        type: 'error',
        text1: t('chat_not_found'),
        visibilityTime: 2000,
        autoHide: true,
      });
      return;
    }
    onChat(result.data);
  };

  if (isSuggest) {
    return (
      <View style={[styles.contain, style]}>
        <View style={[styles.itemContainer, styles.itemSuggestionContainer]}>
          <View style={[GlobalStyles.flexRow, GlobalStyles.justifyBetween, GlobalStyles.mb20, styles.itemSuggestionHeader]}>
            <Paragraph p title={t('suggested_connection')} />
            <TouchableOpacity onPress={onRejectSuggest}>
              <Icon name="times" size={adjust(15)} color={BASE_COLORS.blackColor} />
            </TouchableOpacity>
          </View>
          <View style={[GlobalStyles.flexRow]}>
            <TouchableOpacity onPress={onPress} onLongPress={onPress} style={styles.profileContainer}>
              <View style={styles.imageProfileContainer}>
                <UserAvatar
                  user={user}
                  size={60}
                  iconColor={BASE_COLORS.blackColor}
                />
              </View>
              <View style={styles.groupText}>
                <Paragraph h5 bold title={`${user?.firstName} ${user?.lastName}`} style={styles.boldTitle} />
                <Paragraph p numberOfLines={2} title={user?.title} style={styles.title} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onAddSuggest} style={[GlobalStyles.justifyCenter]}>
              <View style={[styles.pendingInviteArea]}>
                <Paragraph textWhite title={t('add').toUpperCase()} style={styles.pendingAdd} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.contain, style]}>
      <View style={[GlobalStyles.flexRow, styles.itemContainer]}>
        <TouchableOpacity onPress={onPress} onLongPress={onPress} style={styles.profileContainer}>
          <View style={styles.imageProfileContainer}>
            <UserAvatar
              user={user}
              size={60}
              iconColor={!status || status === INVITE_STATUS.APPROVED ? BASE_COLORS.blackColor : BASE_COLORS.grayColor}
            />
          </View>
          {status === INVITE_STATUS.APPROVED ? (
            <View style={styles.groupText}>
              <Paragraph h5 bold title={name} style={styles.boldTitle} />
              {/* <Paragraph h5 title={myself?.company_name} style={styles.title} /> */}
              <Paragraph p numberOfLines={2} title={user?.title} style={styles.title} />
            </View>
          ) : (
            <View style={styles.groupText}>
              <Paragraph h5 bold title={name} style={styles.boldLightTitle} />
              <Paragraph p title={phoneNumber} style={styles.lightTitle} />
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.groupBtn}>
          {!status || status === INVITE_STATUS.APPROVED ? (
            <TouchableOpacity onPress={onPressChat} style={styles.iconMessageContainer}>
              <Icon name='comment-alt' size={adjust(12)} color={BASE_COLORS.eerieBlackColor} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.pendingContainer} onPress={onPending}>
              <View style={styles.pendingInviteArea}>
                <Paragraph textWhite title={t('pending_invite')} />
              </View>
            </TouchableOpacity>
          )}
          {!user && (
            <TouchableOpacity style={styles.iconMinusContainer} onPress={onConfirm}>
              <Icon name='minus-circle' size={adjust(20)} color={BASE_COLORS.indianRedColor} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default React.memo(BlockItem);
