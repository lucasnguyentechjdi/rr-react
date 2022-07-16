import { BASE_COLORS, GlobalStyles } from '~Root/config';
import { GestureResponderEvent, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Icon, Image, Paragraph } from '~Root/components';

import { IMySelf } from '~Root/services/user/types';
import React from 'react';
import { adjust } from '~Root/utils';
import styles from './styles';

interface Props {
  id: string;
  first_name?: string;
  last_name?: string;
  myself: IMySelf;
  profile_photo?: string | null;
  status: number;
  phoneNumber?: string;
  style?: ViewStyle;
  onPress?: (event: GestureResponderEvent) => void;
}

const FeedBlockItem: React.FC<Props> = ({
  first_name = '',
  last_name = '',
  myself,
  profile_photo,
  status = 0,
  phoneNumber,
  style = {},
  onPress = () => {},
}: Props) => {
  return (
    <View style={[styles.contain, style]}>
      <View style={[GlobalStyles.flexRow, styles.itemContainer]}>
        <TouchableOpacity onPress={onPress} style={styles.profileContainer}>
          <View style={styles.imageProfileContainer}>
            {profile_photo ? (
              <Image source={{ uri: profile_photo }} style={styles.imageProfile} />
            ) : (
              <View style={GlobalStyles.center}>
                <Icon name='user-circle' size={40} color={BASE_COLORS.blackColor} />
              </View>
            )}
          </View>
          {status === 1 ? (
            <View style={styles.groupText}>
              <Paragraph h5 bold title={`${first_name} ${last_name}`} style={styles.boldTitle} />
              <Paragraph p title={myself?.biztype} style={styles.boldTitle} />
            </View>
          ) : (
            <View style={styles.groupText}>
              <Paragraph p title={phoneNumber} style={styles.title} />
            </View>
          )}
        </TouchableOpacity>
        <Paragraph p numberOfLines={2} title={myself?.self_intro} style={GlobalStyles.ph15} />
        {myself?.industry && myself?.industry.length > 0 && (
          <Paragraph p title={'Industries I sell to'} style={GlobalStyles.ph15} />
        )}
        <View style={[GlobalStyles.flexRow, GlobalStyles.ml10]}>
          {myself?.industry &&
            myself?.industry.map(item => (
              <TouchableOpacity style={[styles.tag, GlobalStyles.mr10]}>
                <Paragraph p style={styles.tagText} title={item} />
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </View>
  );
};

export default FeedBlockItem;
