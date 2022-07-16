import React from 'react';
import Svg, { Path } from 'react-native-svg';

const PrevIcon = () => {
  return (
    <Svg width={7} height={12} viewBox='0 0 7 12' fill='none'>
      <Path d='M7.666e-08 6.42885L6.75 0.861544L6.75 11.9962L7.666e-08 6.42885Z' fill='#E5EFF7' />
    </Svg>
  );
};

const NextIcon = () => {
  return (
    <Svg width={7} height={12} viewBox='0 0 7 12' fill='none'>
      <Path d='M7 6.42857L0.25 11.9959L0.25 0.861265L7 6.42857Z' fill='#E5EFF7' />
    </Svg>
  );
};

export { PrevIcon, NextIcon };
