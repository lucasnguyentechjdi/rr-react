import React from 'react'
import Svg, { Path } from 'react-native-svg'

type Props = {}

const Calendar = (props: Props) => {
    return (
        <Svg width="15" height="18" viewBox="0 0 15 18" fill="none">
            <Path d="M11.2089 16.6089H3.12914C1.69426 16.6089 0.529419 15.3129 0.529419 13.7093V5.28252C0.529419 3.67884 1.69426 2.37695 3.12914 2.37695H11.2142C12.6491 2.37695 13.8139 3.67884 13.8139 5.28252V13.7093C13.8086 15.3129 12.6438 16.6089 11.2089 16.6089Z" stroke="white" stroke-miterlimit="10" />
            <Path d="M0.529419 6.79736H13.8086" stroke="white" stroke-miterlimit="10" />
            <Path d="M4.68066 1.02783V4.79146" stroke="white" stroke-miterlimit="10" stroke-linecap="round" />
            <Path d="M9.65747 1.02783V4.79146" stroke="white" stroke-miterlimit="10" stroke-linecap="round" />
        </Svg>
    )
}

export default Calendar;