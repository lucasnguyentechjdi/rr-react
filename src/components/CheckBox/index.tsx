import React from 'react';
import { TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { BASE_COLORS } from '~Root/config';
import { Paragraph } from '~Root/components';
import styles from './styles';
import { IField } from '~Root/services/ask/types';

interface Props {
  isChecked: boolean;
  onChange?: (isChecked: boolean, item: IField) => void;
  item?: any;
  style?: ViewStyle;
  iconStyle?: ViewStyle;
  textStyle?: TextStyle;
  text?: string;
  textTran?: React.ReactNode;
  color?: string;
  size?: number;
}

const CheckBox: React.FC<Props> = ({
  isChecked = false,
  onChange = () => { },
  item,
  style = {},
  iconStyle = {},
  textStyle = {},
  text,
  textTran,
  color = BASE_COLORS.blackColor,
  size = 30,
}) => {
  const isText = Boolean(text);

  return (
    <TouchableOpacity style={[styles.checkBox, style]} onPress={() => onChange(!isChecked, item)}>
      <Icon size={size} color={color} name={isChecked ? 'check-box' : 'check-box-outline-blank'} style={iconStyle} />
      {isText && <Paragraph style={textStyle} title={text} />}
      {textTran && textTran}
    </TouchableOpacity>
  );
};

export default CheckBox;
