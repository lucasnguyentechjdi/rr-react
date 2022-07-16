import React from 'react';
import {View, Text, TextInput, ViewStyle, TextStyle} from 'react-native';

import {BASE_COLORS} from '~Root/config';
import styles from './styles';

interface Props {
  label?: string;
  error?: string;
  labelStyle?: ViewStyle & TextStyle;
  inputStyleContainer?: ViewStyle & TextStyle;
  inputStyleArea?: ViewStyle & TextStyle;
  inputStyle?: ViewStyle & TextStyle;
  placeholder?: string;
  placeholderTextColor?: string;
  onFocus?: () => void;
  onChangeText?: (text: string) => void;
  onPressIn?: () => void;
  editable?: boolean;
  isChildren?: boolean;
  children?: React.ReactNode;
  value?: string;
  selectionColor?: string;
}

const Input: React.FC<Props> = ({
  label,
  labelStyle,
  inputStyleContainer = {},
  inputStyleArea = {},
  inputStyle = {},
  placeholder = '',
  placeholderTextColor,
  error,
  onFocus = () => {},
  onChangeText = () => {},
  onPressIn = () => {},
  editable = true,
  isChildren = false,
  children,
  value = '',
  selectionColor = BASE_COLORS.whiteColor,
}: Props) => {
  const isError = Boolean(error);
  const isText = Boolean(label);

  return (
    <View style={[styles.container, inputStyleContainer]}>
      {isText && <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>}
      <View style={[inputStyleArea]}>
        {isChildren && children}
        <TextInput
          onPressIn={onPressIn}
          selectionColor={selectionColor}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          style={[styles.inputStyle, inputStyle, isError && styles.inputErrorStyle]}
          onFocus={onFocus}
          onChangeText={onChangeText}
          editable={editable}
          value={value}
        />
      </View>
      {isError && <Text style={styles.textError}>{error}</Text>}
    </View>
  );
};

export default Input;
