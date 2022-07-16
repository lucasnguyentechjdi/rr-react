import { Dimensions, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

import { BASE_COLORS } from '~Root/config';
import { Paragraph } from '..';
import React from 'react';
import styles from './styles';

const width = Dimensions.get('window').width;

interface Props {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  p?: boolean;
  bold?: boolean;
  italic?: boolean;
  textWhite?: boolean;
  textBlack?: boolean;
  textTealBlue?: boolean;
  textGreyColor?: boolean;
  textCenter?: boolean;
  title?: string;
  onPress?: any;
  type?: string;
  bordered?: boolean;
  size?: string;
  containerStyle?: ViewStyle & TextStyle;
  textStyle?: ViewStyle & TextStyle;
  disabled?: boolean;
  isIconLeft?: boolean;
  isIconRight?: boolean;
  buttonTextColor?: string;
  bgVerifyColor?: string | boolean;
  children?: React.ReactNode;
}

const Button: React.FC<Props> = ({
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  bold,
  italic,
  textWhite,
  textBlack,
  textTealBlue,
  textGreyColor,
  textCenter,
  title = 'Save',
  onPress = () => { },
  type = 'filled',
  bordered = false,
  size = 'auto',
  containerStyle = {},
  textStyle = {},
  disabled = false,
  isIconLeft = false,
  isIconRight = false,
  buttonTextColor = BASE_COLORS.primary,
  bgVerifyColor = false,
  children,
}) => {
  const large = width / 1.3;
  const small = width / 2;
  const btnSize = size === 'large' ? large : small;
  const btnBgColor = disabled
    ? BASE_COLORS.grayColor
    : bgVerifyColor
      ? bgVerifyColor
      : type === 'filled'
        ? BASE_COLORS.whiteColor
        : 'transparent';
  const btnTextColor = type === 'filled' ? BASE_COLORS.whiteColor : buttonTextColor;
  const btnBorderRadius = bordered ? 16 : 5;

  const containerCommonStyle = {
    backgroundColor: btnBgColor,
    width: size === 'auto' ? 'auto' : btnSize,
    borderRadius: btnBorderRadius,
  };

  const textCommonStyle = {
    color: btnTextColor,
  };

  const border = type === 'outlined' && styles.border;

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} activeOpacity={0.7}>
      <View style={[containerCommonStyle, border, styles.containerCommonStyle, containerStyle]}>
        {isIconLeft && children}
        <Paragraph
          h1={h1}
          h2={h2}
          h3={h3}
          h4={h4}
          h5={h5}
          p={p}
          bold={bold}
          italic={italic}
          textWhite={textWhite}
          textBlack={textBlack}
          textTealBlue={textTealBlue}
          textGreyColor={textGreyColor}
          textCenter={textCenter}
          style={[textCommonStyle, textStyle]}
          title={title}
        />
        {isIconRight && children}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
