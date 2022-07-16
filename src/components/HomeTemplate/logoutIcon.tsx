import React from 'react';
import Svg, {Path} from 'react-native-svg';

const LogoutIcon = () => {
  return (
    <Svg width={24} height={24} viewBox='0 0 18 18' fill='none'>
      <Path
        d='M14.25 15.75H7.5a1.5 1.5 0 01-1.5-1.5v-3h1.5v3h6.75V3.75H7.5v3H6v-3a1.5 1.5 0 011.5-1.5h6.75a1.5 1.5 0 011.5 1.5v10.5a1.5 1.5 0 01-1.5 1.5zM9 12V9.75H2.25v-1.5H9V6l3.75 3L9 12z'
        fill='#fff'
        fillOpacity={0.8}
      />
    </Svg>
  );
};

export default LogoutIcon;
