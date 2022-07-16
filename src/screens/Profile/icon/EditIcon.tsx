import React from 'react'
import Svg, { Path } from 'react-native-svg'

type Props = {}

const EditIcon = (props: Props) => {
    return (
        <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M8.58848 0.166992C8.97041 0.166992 9.33653 0.319487 9.60392 0.588989L11.4128 2.39785C11.6821 2.66716 11.8334 3.03242 11.8334 3.41329C11.8334 3.79415 11.6821 4.15942 11.4128 4.42873L4.80857 11.0308C4.40112 11.5009 3.82355 11.7896 3.16187 11.835H0.166687V11.2517L0.168581 8.79292C0.218276 8.17781 0.504243 7.60585 0.940477 7.22149L7.57233 0.589692C7.84125 0.319143 8.20698 0.166992 8.58848 0.166992ZM3.12071 10.6698C3.43234 10.6477 3.72242 10.5027 3.95535 10.2363L8.36637 5.82525L6.17632 3.63511L1.73944 8.07092C1.50311 8.27995 1.3569 8.57238 1.33338 8.83989V10.6687L3.12071 10.6698ZM7.00137 2.81025L9.19133 5.00029L10.5878 3.60377C10.6384 3.55325 10.6667 3.48473 10.6667 3.41329C10.6667 3.34184 10.6384 3.27332 10.5878 3.2228L8.77737 1.41232C8.72742 1.36197 8.65943 1.33366 8.58851 1.33366C8.51758 1.33366 8.44959 1.36197 8.39964 1.41232L7.00137 2.81025Z" fill="#679C79" />
        </Svg>
    )
}

export default EditIcon