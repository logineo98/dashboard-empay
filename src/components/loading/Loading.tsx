import React, { FC } from 'react'
import { RotatingLines } from 'react-loader-spinner'

const Loading: FC<{ width?: string, color?: string }> = ({ width, color }) => (
    <RotatingLines
        strokeColor={color ? color : '#3C4B64'}
        strokeWidth='5'
        animationDuration='0.75'
        width={width ? width : '50'}
        visible={true}
    />
)

export default Loading