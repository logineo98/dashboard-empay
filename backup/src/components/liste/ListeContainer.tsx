import React, { FC } from 'react'
import Divider from '../divider/Divider'

type COMPONENT_TYPE = {
    children: JSX.Element,
    name: string,
}

const ListeContainer: FC<COMPONENT_TYPE> = (props) => {
    const { children, name } = props

    return (
        <div className='liste_container'>
            <h1 className='liste_name'> {name} </h1>
            <Divider marginVertical={'0'} />

            {children}
        </div>
    )
}

export default ListeContainer