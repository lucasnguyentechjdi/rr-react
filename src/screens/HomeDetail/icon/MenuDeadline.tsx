import React from 'react'
import Svg, { Path } from 'react-native-svg'

type Props = {}

const MenuDeadline = (props: Props) => {
    return (
        <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <Path d="M15.9474 1.58052H12.4589V0.290197C12.4589 0.201487 12.3842 0.128906 12.2928 0.128906H11.13C11.0386 0.128906 10.9639 0.201487 10.9639 0.290197V1.58052H5.64804V0.290197C5.64804 0.201487 5.57329 0.128906 5.48193 0.128906H4.31909C4.22773 0.128906 4.15297 0.201487 4.15297 0.290197V1.58052H0.664476C0.296938 1.58052 0 1.86883 0 2.22568V15.6128C0 15.9696 0.296938 16.2579 0.664476 16.2579H15.9474C16.315 16.2579 16.6119 15.9696 16.6119 15.6128V2.22568C16.6119 1.86883 16.315 1.58052 15.9474 1.58052ZM15.1168 14.8063H1.49507V7.14504H15.1168V14.8063ZM1.49507 5.77407V3.03213H4.15297V3.99987C4.15297 4.08858 4.22773 4.16116 4.31909 4.16116H5.48193C5.57329 4.16116 5.64804 4.08858 5.64804 3.99987V3.03213H10.9639V3.99987C10.9639 4.08858 11.0386 4.16116 11.13 4.16116H12.2928C12.3842 4.16116 12.4589 4.08858 12.4589 3.99987V3.03213H15.1168V5.77407H1.49507Z" fill="#5EA573" />
        </Svg>

    )
}

export default MenuDeadline