import React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
import {GlobalStyles} from '~Root/config';

const AskFeed = ({isActive}: any) => {
  return (
    <Svg width={33} height={26} style={GlobalStyles.mt10} viewBox='0 0 33 26' fill='none'>
      <G clipPath='url(#clip0_5536_15496)' fill={!isActive ? '#BCBCBC' : '#4683AE'}>
        <Path d='M24.37 10.86l6.87-.6a.38.38 0 01.42.35l.6 6.87a.391.391 0 01-.63.33l-1.27-1.06a.39.39 0 00-.49 0l-9.88 8a.39.39 0 01-.58-.49l6.12-11.16a.4.4 0 00-.09-.49l-1.31-1.07a.38.38 0 01.24-.68zM7.89 10.86l-6.87-.6a.381.381 0 00-.42.35L0 17.48a.39.39 0 00.63.33l1.27-1.06a.39.39 0 01.49 0l9.88 8a.39.39 0 00.58-.49L6.73 13.1a.4.4 0 01.09-.49l1.31-1.07a.38.38 0 00-.24-.68zM23.28 6.93L16.51.16a.54.54 0 00-.76 0L8.98 6.93a.54.54 0 00.38.92h2.29a.54.54 0 01.53.43l3.41 17.29a.54.54 0 001.06 0l3.41-17.29a.54.54 0 01.53-.43h2.31a.54.54 0 00.38-.92z' />
      </G>
      <Defs>
        <ClipPath id='clip0_5536_15496'>
          <Path fill='#fff' d='M0 0H32.27V26H0z' />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default AskFeed;
