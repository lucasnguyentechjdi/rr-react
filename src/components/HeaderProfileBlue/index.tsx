import React from 'react';
import {View, TouchableOpacity, PixelRatio} from 'react-native';
import {useTranslation} from 'react-i18next';

import {BASE_COLORS, GlobalStyles, IMAGES} from '~Root/config';
import {Image, Paragraph, Icon} from '~Root/components';

interface Props {
  title?: string;
  profilePhoto?: string;
  isBackButton?: boolean;
  isEdit?: boolean;
  onBack?: () => void;
  onUpdate?: () => void;
}

const HeaderProfileBlue: React.FC<Props> = ({
  title,
  profilePhoto,
  isBackButton = false,
  isEdit = false,
  onBack = () => {},
  onUpdate = () => {},
}) => {
  const {t} = useTranslation();

  return (
    <View
      style={[
        GlobalStyles.containerHeaderNew,
        GlobalStyles.flexRow,
        GlobalStyles.ph15,
        GlobalStyles.containerHeaderBlueMD,
        GlobalStyles.headerNew,
        GlobalStyles.pv15,
      ]}>
      {isBackButton && (
        <TouchableOpacity onPress={onBack}>
          <Image source={IMAGES.iconBack} style={GlobalStyles.iconBack} />
        </TouchableOpacity>
      )}
      <View style={[GlobalStyles.flexColumn, GlobalStyles.container]}>
        <Paragraph textWhite textCenter bold h3 style={GlobalStyles.mb15} title={title ?? t('your_profile')} />
        <View style={[GlobalStyles.avatarContainer]}>
          <TouchableOpacity onPress={isEdit ? onUpdate : () => {}} activeOpacity={isEdit ? 0.2 : 1}>
            {profilePhoto ? (
              <Image source={{uri: profilePhoto}} style={[GlobalStyles.avatar]} />
            ) : (
              <Icon
                name='user-circle'
                size={PixelRatio.roundToNearestPixel(70)}
                color={BASE_COLORS.blackColor}
                style={GlobalStyles.avatar}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HeaderProfileBlue;
