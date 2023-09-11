import React, { FC } from 'react'

type COMPONENT_TYPE = {
    title: string
}

const NoFilteredDataSearch: FC<COMPONENT_TYPE> = ({ title }) => {

    if (title === 'admin') {
        return <h2 className='no_data'>Aucun administrateur trouvé !</h2>
    } else if (title === 'customer') {
        return <h2 className='no_data'>Aucun client trouvé !</h2>
    } else if (title === 'partner') {
        return <h2 className='no_data'>Aucun partenaire trouvé !</h2>
    } else {
        return <></>
    }
}

export default NoFilteredDataSearch