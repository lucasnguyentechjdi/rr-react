import React from 'react';
import Svg, {Path} from 'react-native-svg';

const PaperPlan = () => {
  return (
    <Svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <Path
        d='M9.91196 11.9998H3.99996L2.02296 4.1348C2.0103 4.0891 2.00259 4.04216 1.99996 3.9948C1.97796 3.2738 2.77196 2.7738 3.45996 3.1038L22 11.9998L3.45996 20.8958C2.77996 21.2228 1.99596 20.7368 1.99996 20.0288C2.00198 19.9655 2.0131 19.9029 2.03296 19.8428L3.49996 14.9998'
        stroke='white'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
        strokeWidth={2}
      />
    </Svg>
  );
};

export default PaperPlan;
