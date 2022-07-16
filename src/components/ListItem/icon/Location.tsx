import React from 'react'
import Svg, { Path } from 'react-native-svg';

type Props = {}

const Location = (props: Props) => {
    return (
        <Svg width="11" height="18" viewBox="0 0 11 18" fill="none">
            <Path d="M5.56091 16.4426L9.40281 8.98902C11.2306 5.44743 8.94199 1.01465 5.27613 1.01465C1.62062 1.01465 -0.667952 5.43586 1.1598 8.97745L5.01206 16.4426C5.13115 16.6798 5.43664 16.6798 5.56091 16.4426Z" stroke="white" stroke-miterlimit="10" />
            <Path d="M5.28136 8.16746C6.13924 8.16746 6.83469 7.3902 6.83469 6.43139C6.83469 5.47258 6.13924 4.69531 5.28136 4.69531C4.42348 4.69531 3.72803 5.47258 3.72803 6.43139C3.72803 7.3902 4.42348 8.16746 5.28136 8.16746Z" stroke="white" stroke-miterlimit="10" />
        </Svg>
    )
}

export default Location;