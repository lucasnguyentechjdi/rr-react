import React from 'react';
import { Text } from 'react-native';

import styles from './styles';

interface Props {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  p?: boolean;
  bold?: boolean;
  bold600?: boolean;
  italic?: boolean;
  textPrimary?: boolean;
  textWhite?: boolean;
  textBlack?: boolean;
  textGray?: boolean;
  textTealBlue?: boolean;
  textGreyColor?: boolean;
  textOxleyColor?: boolean;
  textIndianRedColor?: boolean;
  textSteelBlueColor?: boolean;
  textEerieBlackColor?: boolean;
  textSpanishGrayColor?: boolean;
  textTimberWolfColor?: boolean;
  textCenter?: boolean;
  title?: string;
  style?: any;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip' | undefined;
}

const Paragraph: React.FC<Props> = ({
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  bold,
  bold600,
  italic,
  textPrimary,
  textWhite,
  textBlack,
  textGray,
  textTealBlue,
  textGreyColor,
  textOxleyColor,
  textIndianRedColor,
  textSteelBlueColor,
  textEerieBlackColor,
  textSpanishGrayColor,
  textTimberWolfColor,
  textCenter,
  title,
  style,
  numberOfLines = undefined,
  ellipsizeMode = 'tail',
  ...rest
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={[
        styles.default,
        h1 && styles.h1,
        h2 && styles.h2,
        h3 && styles.h3,
        h4 && styles.h4,
        h5 && styles.h5,
        p && styles.p,
        bold && styles.bold,
        bold600 && styles.bold600,
        italic && styles.italic,
        textPrimary && styles.textPrimary,
        textWhite && styles.textWhite,
        textBlack && styles.textBlack,
        textGray && styles.textGray,
        textTealBlue && styles.textTealBlue,
        textGreyColor && styles.textGreyColor,
        textOxleyColor && styles.textOxleyColor,
        textIndianRedColor && styles.textIndianRedColor,
        textSteelBlueColor && styles.textSteelBlueColor,
        textEerieBlackColor && styles.textEerieBlackColor,
        textSpanishGrayColor && styles.textSpanishGrayColor,
        textTimberWolfColor && styles.textTimberWolfColor,
        textCenter && styles.textCenter,
        style,
      ]}
      {...rest}>
      {title}
    </Text>
  );
};

export default Paragraph;
