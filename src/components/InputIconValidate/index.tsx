import React from 'react';
import {View, Text, TextInput, ViewStyle, TextStyle, Pressable, Image, ImageStyle} from 'react-native';
import {Controller} from 'react-hook-form';

import {BASE_COLORS} from '~Root/config';
import styles from './styles';
import {Icon, Paragraph} from '~Root/components';

interface Props {
  label?: string;
  errors?: any;
  labelStyle?: any;
  showIcon?: boolean;
  styleContainer?: ViewStyle & TextStyle;
  inputStyleWrapper?: ViewStyle;
  inputStyle?: ViewStyle;
  inputErrorStyle?: any;
  defaultValue?: string;
  control?: any;
  name?: string;
  rules?: any;
  secureTextEntry?: boolean;
  editable?: boolean;
  ref?: any;
  register?: any;
  required?: boolean;
  autoFocus?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  placeholder?: string;
  placeholderTextColor?: string;
  selectionColor?: string;
  children?: React.ReactNode;
  autoCorrect?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password';
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  iconContainerStyle?: ViewStyle & TextStyle;
  iconStyle?: ViewStyle & TextStyle;
  isIconImage?: boolean;
  imageStyle?: ImageStyle & TextStyle;
  uri?: any;
  onPressIn?: () => void;
  onSubmitEditing?: () => void;
  onIconClick: () => void;
}

const InputIconValidate: React.FC<Props> = ({
  label,
  labelStyle,
  showIcon = false,
  styleContainer,
  inputStyleWrapper = {},
  inputStyle = {},
  inputErrorStyle = {},
  defaultValue = '',
  errors = null,
  control = null,
  name = 'text',
  rules = {required: false},
  secureTextEntry = false,
  editable = true,
  register,
  required = false,
  autoFocus = false,
  multiline = false,
  numberOfLines = 8,
  placeholder = '',
  placeholderTextColor,
  selectionColor,
  children,
  autoCorrect = false,
  autoCapitalize = 'none',
  keyboardType = 'default',
  iconName = 'home',
  iconSize = 38,
  iconColor = BASE_COLORS.blackColor,
  iconContainerStyle = {},
  iconStyle = {},
  isIconImage = false,
  imageStyle = {},
  uri,
  onPressIn = () => {},
  onSubmitEditing = () => {},
  onIconClick = () => {},
}) => {
  const isError = errors?.[name] && Boolean(errors[name]);
  const isText = Boolean(label);
  const styleErrors = isError && {...styles.inputErrorStyle, ...inputErrorStyle};

  return (
    <View style={[styles.container, styleContainer]}>
      {isText && <Paragraph h4 style={[styles.labelStyle, labelStyle]} title={label} />}
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value, ref}}) => {
          return (
            <Pressable onPress={onPressIn}>
              <View style={[styles.textInputWrapper, inputStyleWrapper]}>
                {showIcon && isIconImage ? (
                  <Image source={uri} style={imageStyle} />
                ) : (
                  <Pressable onPress={onIconClick} style={iconContainerStyle}>
                    <Icon name={iconName} size={iconSize} color={iconColor} style={iconStyle} />
                  </Pressable>
                )}
                <TextInput
                  {...register(name, {required})}
                  inputRef={ref}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  selectionColor={selectionColor ?? BASE_COLORS.whiteColor}
                  secureTextEntry={secureTextEntry}
                  style={[styles.inputStyle, inputStyle, styleErrors]}
                  placeholder={placeholder}
                  placeholderTextColor={placeholderTextColor}
                  multiline={multiline}
                  numberOfLines={numberOfLines}
                  editable={editable}
                  autoCorrect={autoCorrect}
                  autoCapitalize={autoCapitalize}
                  keyboardType={keyboardType}
                  onPressIn={onPressIn}
                  autoFocus={autoFocus}
                  onSubmitEditing={onSubmitEditing}
                />
              </View>
            </Pressable>
          );
        }}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
      />
      {children}
      {isError && <Text style={styles.textError}>{errors[name]?.message}</Text>}
    </View>
  );
};

export default InputIconValidate;
