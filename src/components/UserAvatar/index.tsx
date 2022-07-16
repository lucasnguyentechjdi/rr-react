import { BASE_COLORS, GlobalStyles } from '~Root/config';
import { Icon } from '~Root/components';
import { View } from 'react-native';

import React from 'react';
import { IUser } from '~Root/services/user/types';
import Image from '../Image';
import { imageUrl } from '~Root/services/upload';
import { adjust } from '~Root/utils';
import { ImageStyle } from 'react-native-fast-image';

interface Props {
  user: IUser | null | undefined;
  size: number;
  imageSize?: number | undefined;
  iconColor?: string;
}

const UserAvatar: React.FC<Props> = ({ user, size, imageSize = undefined, iconColor = BASE_COLORS.blackColor }) => {
  const imageProfile = (size: number | undefined): ImageStyle => {
    if (!size) {
      return {
        width: '100%',
        height: '100%',
      };
    }
    return {
      width: size,
      height: size,
      borderRadius: adjust(size * 2),
    };
  };

  return (
    <>
      {user?.avatar ? (
        <Image source={{ uri: imageUrl(user.avatar) }} style={imageProfile(imageSize)} />
      ) : (
        <View style={GlobalStyles.center}>
          <Icon name='user-circle' size={size} color={iconColor} />
        </View>
      )}
    </>
  );
};

export default React.memo(UserAvatar);
