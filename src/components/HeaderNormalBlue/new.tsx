import { GlobalStyles, IMAGES } from '~Root/config';
import { Image, Paragraph } from '~Root/components';
import { TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

import React from 'react';
import BackIcon from './backIcon';

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
  onBack = () => {},
  title = '',
  containerHeaderStyle = {},
  headerTextStyle = {},
  showTitle = false,
  children,
}) => {
  return (
    <View style={[GlobalStyles.containerHeaderLightBlue, GlobalStyles.headerNewWithContent, containerHeaderStyle]}>
      <View style={[GlobalStyles.flexRow, GlobalStyles.header]}>
        {isBackButton && (
          <TouchableOpacity onPress={onBack} style={[GlobalStyles.mr10]}>
            <BackIcon />
          </TouchableOpacity>
        )}
        {showTitle && <Paragraph h5 style={[GlobalStyles.headerTextBlack, headerTextStyle]} title={title} />}
        {children}
      </View>
    </View>
  );
};

export default HeaderNormalBlue;
