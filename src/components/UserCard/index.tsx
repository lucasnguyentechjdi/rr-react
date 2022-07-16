import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {Button, Icon, Paragraph} from '~Root/components';
import {TextStyle, View, ViewStyle} from 'react-native';

import React from 'react';
import styles from './styles';

interface Props {
  showIcon?: boolean;
  styleContainer?: ViewStyle;
  showTitle?: boolean;
  title: string;
  titleStyle?: ViewStyle;
  showSubTitle?: boolean;
  subTitle?: string;
  subTitleStyle?: TextStyle;
  subTitleContainerStyle?: ViewStyle;
  showButton?: boolean;
  showIconSubTitle?: boolean;
  iconSubName?: string;
  iconSubSize?: number;
  iconSubColor?: string;
  buttonTitle?: string;
  iconName?: string;
  buttonType?: string;
  iconSize?: number;
  iconColor?: string;
  onPress: () => void;
  showRequired?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  textRequiredStyle?: TextStyle;
  disabled?: boolean;
}

const UserCard: React.FC<Props> = ({
  showIcon = true,
  styleContainer = {},
  showTitle = true,
  title = 'Unknown',
  titleStyle = {},
  showSubTitle = true,
  subTitle = 'visible to public',
  subTitleStyle = {},
  subTitleContainerStyle = {},
  showButton = true,
  showIconSubTitle = true,
  iconSubName = 'home',
  iconSubSize = 14,
  iconSubColor = BASE_COLORS.gunmetalColor,
  buttonTitle = 'Add',
  iconName = 'plus',
  buttonType = 'outlined',
  iconSize = 14,
  iconColor = BASE_COLORS.gunmetalColor,
  onPress = () => {},
  showRequired = false,
  containerStyle = {},
  textStyle = {},
  textRequiredStyle = {},
  children,
  disabled = false,
}) => {
  return (
    <View style={[GlobalStyles.flexColumn, styles.listContainer, styleContainer]}>
      {showTitle && <Paragraph h5 bold title={title} style={titleStyle} />}
      {showSubTitle && (
        <View style={[styles.subTitleContainer, subTitleContainerStyle]}>
          {showIconSubTitle && <Icon name={iconSubName} size={iconSubSize} color={iconSubColor} enableRTL={true} />}
          <Paragraph p title={subTitle} style={subTitleStyle} />
        </View>
      )}
      {showButton && (
        <Button
          disabled={disabled}
          title={buttonTitle}
          isIconRight={true}
          onPress={onPress}
          type={buttonType}
          containerStyle={containerStyle}
          textStyle={textStyle}>
          {showIcon && <Icon name={iconName} size={iconSize} color={iconColor} enableRTL={true} />}
        </Button>
      )}
      {showRequired && <Paragraph p title='* required' style={[styles.textRequiredStyle, textRequiredStyle]} />}
      {children}
    </View>
  );
};

export default UserCard;
