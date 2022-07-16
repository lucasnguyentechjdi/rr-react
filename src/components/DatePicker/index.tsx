import React from 'react';
import {ViewStyle, TextStyle, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {Input} from '~Root/components';

interface Props {
  mode?: any;
  show?: boolean;
  handleConfirm?: (date: Date) => void;
  hideDatePicker?: () => void;
  onFocus?: () => void;
  style?: ViewStyle & TextStyle;
  labelStyle?: ViewStyle & TextStyle;
  inputStyle?: ViewStyle & TextStyle;
  label: string;
  placeholder?: string;
  placeholderTextColor?: string;
  editable?: boolean;
  value?: string;
  register?: any;
  name?: string;
}

const DatePicker = React.forwardRef(
  (
    {
      mode = 'date',
      show = false,
      handleConfirm = () => {},
      hideDatePicker = () => {},
      onFocus = () => {},
      style = {},
      labelStyle = {},
      inputStyle = {},
      label = '',
      placeholder = '',
      placeholderTextColor,
      editable = true,
      value = '',
    }: Props,
    ref: any,
  ) => {
    return (
      <View style={style}>
        <Input
          lblText={label}
          labelStyle={labelStyle}
          inputStyle={inputStyle}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onFocus={onFocus}
          onPressIn={onFocus}
          editable={editable}
          value={value}
        />
        <DateTimePickerModal isVisible={show} mode={mode} onConfirm={handleConfirm} onCancel={hideDatePicker} />
      </View>
    );
  },
);

export default DatePicker;
