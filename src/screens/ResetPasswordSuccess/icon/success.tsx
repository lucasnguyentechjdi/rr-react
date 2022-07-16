import Svg, {Path} from 'react-native-svg';

import React from 'react';

const SuccessIcon = () => {
  return (
    <Svg width={114} height={114} viewBox='0 0 114 114' fill='none'>
      <Path
        d='M57 104.5C83.2342 104.5 104.5 83.2342 104.5 57C104.5 30.7658 83.2342 9.5 57 9.5C30.7658 9.5 9.5 30.7658 9.5 57C9.5 83.2342 30.7658 104.5 57 104.5Z'
        stroke='#4683AE'
        strokeWidth='6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M42.75 57L52.25 66.5L71.25 47.5'
        stroke='#4683AE'
        strokeWidth='6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
};

export default SuccessIcon;
