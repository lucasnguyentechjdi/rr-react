import React from 'react';
import Svg, {Path} from 'react-native-svg';

const PaperClip = () => {
  return (
    <Svg width='28' height='28' viewBox='0 0 28 28' fill='none'>
      <Path
        d='M8.75 7.875V21C8.75 24.5 11.375 26.25 14 26.25C16.625 26.25 19.25 24.5 19.25 21V5.25C19.25 2.625 17.5 1.75 15.75 1.75C14 1.75 12.25 2.625 12.25 5.25V20.125C12.25 21 13.125 21.875 14 21.875C14.875 21.875 15.75 21 15.75 20.125V7.875'
        stroke='white'
        stroke-linecap='round'
        stroke-linejoin='round'
        strokeWidth={2}
      />
    </Svg>
  );
};

export default PaperClip;
