import React from 'react';
import {View, GestureResponderEvent, ViewStyle, TextStyle} from 'react-native';

import styles from './styles';
import {Paragraph} from '~Root/components';
import {GlobalStyles} from '~Root/config';
import {IInvite, INVITE_STATUS} from '~Root/services/invite/types';

interface Props {
  style?: ViewStyle & TextStyle;
  styleRow?: ViewStyle & TextStyle;
  onPress?: (event: GestureResponderEvent) => void;
  item: IInvite;
  index: number;
}

const InviteContactItem: React.FC<Props> = ({
  style = {},
  styleRow = {},
  onPress = () => {},
  item,
  index = 1,
}: Props) => {

  const statusText = () => {
    if (item.status === INVITE_STATUS.NEW) {
      return `   pending by ${item.name ?? ''}`;
    }
    if (item.status === INVITE_STATUS.APPROVED && item?.user) {
      const name = `${item?.user?.firstName ?? ''} ${item?.user?.lastName ?? ''}`;
      return `   taken by ${name}`;
    }
    if (item.status === INVITE_STATUS.APPROVED) {
      return `   taken by ${item.name ?? ''}`;
    }
    return '';
  };

  return (
    <View style={[styles.contain, style]}>
      <View style={[GlobalStyles.flexRow, styles.itemContainer]}>
        <Paragraph textTealBlue bold title={`Invite ${index + 1}`} />
        <Paragraph textGreyColor title={statusText()} />
      </View>
    </View>
  );
};

export default InviteContactItem;
