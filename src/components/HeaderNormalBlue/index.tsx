import { GlobalStyles, IMAGES } from '~Root/config';
import { Image, Paragraph } from '~Root/components';
import { TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

import React from 'react';

interface Props {
  isBackButton?: boolean;
  title?: string;
  onBack?: () => void;
  containerHeaderStyle?: ViewStyle;
  headerTextStyle?: TextStyle;
  showTitle?: boolean;
}

const HeaderNormalBlue: React.FC<Props> = ({
  isBackButton = false,
  onBack = () => { },
  title = '',
  containerHeaderStyle = {},
  headerTextStyle = {},
  showTitle = false,
  children,
}) => {
  return (
    <View
      style={[
        GlobalStyles.containerHeader,
        GlobalStyles.containerHeaderBlueMD,
        GlobalStyles.headerNew,
        containerHeaderStyle,
      ]}>
      <View style={[GlobalStyles.flexRow, GlobalStyles.header]}>
        {isBackButton && (
          <TouchableOpacity onPress={onBack} style={[GlobalStyles.mr10]}>
            <Image source={IMAGES.iconBack} style={GlobalStyles.iconBack} />
          </TouchableOpacity>
        )}
        {showTitle && <Paragraph h5 style={[GlobalStyles.headerTextWhite, headerTextStyle]} title={title} />}
        {children}
      </View>
    </View>
  );
};

export default HeaderNormalBlue;
