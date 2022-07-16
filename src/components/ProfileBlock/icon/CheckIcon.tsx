import React from 'react'
import Svg, { Path } from 'react-native-svg'

type Props = {}

const CheckIcon = (props: Props) => {
    return (
        <Svg width="7" height="7" viewBox="0 0 7 7" fill="none">
            <Path d="M6 1L2.5 6L1 4" stroke="#679C79" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>

    )
}

export default CheckIcon