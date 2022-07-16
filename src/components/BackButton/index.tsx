import React from 'react';
import {GestureResponderEvent, TouchableOpacity, ViewStyle} from 'react-native';
import {GlobalStyles, IMAGES} from '~Root/config';

import {Image} from '~Root/components';

interface Props {
  style?: ViewStyle;
  onPress?: (event: GestureResponderEvent) => void;
}

const BackButton = ({onPress, style}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={[GlobalStyles.iconBackContainer, GlobalStyles.ml30, style]}>
      <Image source={IMAGES.iconBack} style={GlobalStyles.iconBack} />
    </TouchableOpacity>
  );
};

export default BackButton;
