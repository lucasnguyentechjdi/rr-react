import React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
import {GlobalStyles} from '~Root/config';

const Chat = ({isActive}: any) => {
  return (
    <Svg width={29} height={24} style={GlobalStyles.mt10} viewBox='0 0 29 24' fill='none'>
      <G clipPath='url(#clip0_5536_12309)'>
        <Path
          d='M24.7 0H3.94A3.67 3.67 0 00.32 3.67v12.84a3.67 3.67 0 003.67 3.67h6.84a1.43 1.43 0 011.25.72l1.54 2.67a.87.87 0 001.5 0l1.54-2.67a1.43 1.43 0 011.25-.72h6.84a3.67 3.67 0 003.67-3.67V3.67A3.668 3.668 0 0024.7 0zM8.02 11.86A1.83 1.83 0 119.85 10a1.81 1.81 0 01-1.83 1.86zm6.39 0A1.83 1.83 0 1116.24 10a1.81 1.81 0 01-1.83 1.86zm6.39 0A1.83 1.83 0 1122.62 10a1.82 1.82 0 01-1.82 1.86z'
          fill={!isActive ? '#BCBCBC' : '#4683AE'}
        />
      </G>
      <Defs>
        <ClipPath id='clip0_5536_12309'>
          <Path fill='#fff' transform='translate(.27)' d='M0 0H28.11V24H0z' />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default Chat;
