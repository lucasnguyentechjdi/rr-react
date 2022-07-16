import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {BASE_COLORS} from '~Root/config';
import {Paragraph} from '~Root/components';
import styles from './styles';

interface Props {
  title: string;
}

const AvatarGradient: React.FC<Props> = ({title = 'UN'}) => {
  return (
    <LinearGradient
      colors={[BASE_COLORS.greyColor, BASE_COLORS.approxIndigoColor]}
      style={[styles.imageContainer, styles.circleGradient]}>
      <Paragraph h2 textWhite bold title={title.toUpperCase()} />
    </LinearGradient>
  );
};

export default AvatarGradient;
