import React, { FC } from 'react'

type COMPONENT_TYPE = {
    marginVertical?: string,
}

const Divider: FC<COMPONENT_TYPE> = (props) => {
    const { marginVertical } = props

    const light = true

    return (
        <div className={light ? 'divider' : 'divider dark'} style={{ margin: marginVertical ? `${marginVertical}px 0` : `15px 0` }}></div>
    )
}

export default Divider