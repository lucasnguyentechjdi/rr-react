import {GlobalStyles, IMAGES} from '~Root/config';
import {Image, Paragraph} from '~Root/components';
import {TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';

import React from 'react';

interface Props {
  isBackButton?: boolean;
  title?: string;
  onBack?: () => void;
  containerHeaderStyle?: ViewStyle;
  headerTextStyle?: TextStyle;
}

const HeaderXSSmallBlue: React.FC<Props> = ({
  isBackButton = false,
  onBack = () => {},
  title = '',
  containerHeaderStyle = {},
  headerTextStyle = {},
}) => {
  return (
    <View style={[GlobalStyles.containerHeaderXS, GlobalStyles.containerHeaderBlueXSSM, containerHeaderStyle]}>
      <View style={[GlobalStyles.flexRow, GlobalStyles.container, GlobalStyles.headerContainer]}>
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

export default HeaderXSSmallBlue;
