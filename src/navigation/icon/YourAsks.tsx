import React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';
import { GlobalStyles } from '~Root/config';

const YourAsks = ({ isActive }: any) => {
  return (
    <Svg width={28} height={28} style={GlobalStyles.mt10} viewBox='0 0 28 28' fill='none'>
      <G clipPath='url(#clip0_5536_12303)'>
        <Path
          d='M14 0a14 14 0 100 28 14 14 0 000-28zm0 5.87a5.2 5.2 0 11-5.19 5.19A5.19 5.19 0 0114 5.87zm0 20.32a12.21 12.21 0 01-8.52-3.46c1.24-2.45 4.59-4.21 8.52-4.21 3.93 0 7.28 1.76 8.52 4.21A12.21 12.21 0 0114 26.19z'
          fill={!isActive ? '#BCBCBC' : '#4683AE'}
        />
      </G>
      <Defs>
        <ClipPath id='clip0_5536_12303'>
          <Path fill='#fff' d='M0 0H28V28H0z' />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default YourAsks;
