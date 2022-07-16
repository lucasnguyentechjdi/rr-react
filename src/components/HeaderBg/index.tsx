import React from 'react';
import Svg, {Path} from 'react-native-svg';

export interface Props {
  minY: number;
  width: number;
  height: number;
  customBgColor?: string;
  customWavePattern?: string;
}

const HeaderBg = ({minY, width, height, customBgColor, customWavePattern}: Props) => {
  return (
    <Svg
      width='100%'
      height='100%'
      fill='none'
      viewBox={`0 ${minY} ${width} ${height}`}
      preserveAspectRatio='xMinYMin meet'>
      <Path d={customWavePattern} fill={customBgColor} />
    </Svg>
  );
};

HeaderBg.defaultProps = {
  minY: 0,
  width: 375,
  height: 296,
  customBgColor: '#1E7C8B',
  customWavePattern:
    'M89.119 215.86C19.025 215.86.5 269.287 0 296V-1h375v134.717c0 69.321-56.742 83.646-85.113 82.143H89.119z',
};

export default HeaderBg;
