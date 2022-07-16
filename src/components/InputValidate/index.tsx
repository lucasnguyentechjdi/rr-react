import {Pressable, TextInput, TextStyle, View, ViewStyle} from 'react-native';

import {BASE_COLORS} from '~Root/config';
import {Paragraph} from '~Root/components';
import React from 'react';
import styles from './styles';

interface Props {
  label?: string;
  value?: string;
  errors?: any;
  labelStyle?: any;
  styleContainer?: ViewStyle & TextStyle;
  inputStyle?: any;
  inputErrorStyle?: any;
  defaultValue?: string;
  name?: string;
  rules?: any;
  secureTextEntry?: boolean;
  editable?: boolean;
  refCallback?: any;
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
  maxLength?: number;
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
  onChange?: (index: number) => void;
  onPressIn?: () => void;
  onSubmitEditing?: () => void;
  onKeyPress?: (index: number) => void;
  onBlur?: () => void;
}

const InputValidate: React.FC<Props> = ({
  label,
  labelStyle,
  styleContainer,
  inputStyle = {},
  inputErrorStyle = {},
  value = '',
  errors = null,
  name = 'text',
  secureTextEntry = false,
  editable = true,
  refCallback,
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
  onChange = () => {},
  onPressIn = () => {},
  onSubmitEditing = () => {},
  onKeyPress = () => {},
  onBlur = () => {},
  ...rest
}) => {
  const isError = errors?.[name] && Boolean(errors[name]);
  const isText = Boolean(label);
  const styleErrors = isError && {...styles.inputErrorStyle, ...inputErrorStyle};

  return (
    <View style={[styles.container, styleContainer]}>
      {isText && <Paragraph h4 style={[styles.labelStyle, labelStyle]} title={label} />}
      <Pressable onPress={onPressIn}>
        <TextInput
          {...rest}
          {...register(name, {required})}
          ref={refCallback}
          onBlur={onBlur}
          onChangeText={onChange}
          onKeyPress={onKeyPress}
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
      </Pressable>
      {children}
      {isError && <Paragraph p style={styles.textError} title={errors[name]?.message} />}
    </View>
  );
};

export default InputValidate;
