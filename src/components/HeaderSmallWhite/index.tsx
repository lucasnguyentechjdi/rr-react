import React from 'react';
import {View, TouchableOpacity, TextStyle, ViewStyle} from 'react-native';
import {useTranslation} from 'react-i18next';

import {GlobalStyles, IMAGES} from '~Root/config';
import {Image, Paragraph} from '~Root/components';

interface Props {
  title: string;
  isBackButton?: boolean;
  onBack?: () => void;
  containerHeaderStyle?: ViewStyle;
  headerTextStyle?: TextStyle;
}

const HeaderSmallWhite: React.FC<Props> = ({
  title,
  isBackButton = false,
  onBack = () => {},
  containerHeaderStyle = {},
  headerTextStyle = {},
}) => {
  const {t} = useTranslation();

  return (
    <View
      style={[
        GlobalStyles.containerHeader,
        GlobalStyles.containerHeaderWhiteSM,
        GlobalStyles.flexRow,
        containerHeaderStyle,
      ]}>
      {isBackButton && (
        <TouchableOpacity onPress={onBack} style={[GlobalStyles.mr10]}>
          <Image source={IMAGES.iconBackBlue} style={GlobalStyles.iconBack} />
        </TouchableOpacity>
      )}
      <Paragraph h5 style={[GlobalStyles.headerTextBlue, headerTextStyle]} title={title ?? t('referreach')} />
    </View>
  );
};

export default HeaderSmallWhite;
