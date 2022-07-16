import React from 'react';
import {View, TouchableOpacity, ViewStyle, TextStyle} from 'react-native';

import {GlobalStyles, IMAGES} from '~Root/config';
import {Image, Paragraph} from '~Root/components';

interface Props {
  isBackButton?: boolean;
  title?: string;
  onBack?: () => void;
  containerHeaderStyle?: ViewStyle;
  headerTextStyle?: TextStyle;
}

const HeaderSmallBlue: React.FC<Props> = ({
  isBackButton = false,
  onBack = () => {},
  title = '',
  containerHeaderStyle = {},
  headerTextStyle = {},
}) => {
  return (
    <View
      style={[
        GlobalStyles.containerHeaderNew,
        GlobalStyles.containerHeaderBlueSM,
        GlobalStyles.flexRow,
        containerHeaderStyle,
      ]}>
      <View style={[GlobalStyles.flexRow, GlobalStyles.ph5, GlobalStyles.header]}>
        {isBackButton && (
          <TouchableOpacity onPress={onBack} style={[GlobalStyles.mr10]}>
            <Image source={IMAGES.iconBack} style={GlobalStyles.iconBack} />
          </TouchableOpacity>
        )}
        <Paragraph h5 style={[GlobalStyles.headerTextWhite, headerTextStyle]} title={title} />
      </View>
    </View>
  );
};

export default HeaderSmallBlue;
