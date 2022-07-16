import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function PenIcon() {
  return (
    <Svg width={12} height={12} viewBox='0 0 12 12' fill='none'>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.662 0c.393 0 .77.157 1.045.434l1.86 1.86a1.477 1.477 0 010 2.089l-6.793 6.79A2.43 2.43 0 013.081 12H0v-.6l.002-2.529c.051-.632.345-1.22.794-1.616L7.617.435A1.474 1.474 0 018.662 0zM3.038 10.802c.32-.023.62-.172.859-.446L8.434 5.82 6.18 3.567 1.618 8.13a1.243 1.243 0 00-.418.791v1.88l1.838.002zM7.03 2.719l2.252 2.252 1.437-1.436a.277.277 0 000-.392L8.857 1.281a.274.274 0 00-.389 0L7.03 2.72z'
        fill='#555'
      />
    </Svg>
  );
}

export default PenIcon;
