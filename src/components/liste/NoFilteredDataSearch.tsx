import React, { FC } from 'react'

type COMPONENT_TYPE = {
    title: string
}

const NoFilteredDataSearch: FC<COMPONENT_TYPE> = ({ title }) => {

    if (title === 'admin') {
        return <h2 className='no_data'>Aucun administrateur trouvé !</h2>
    } else {
        return <></>
    }
}

export default NoFilteredDataSearch