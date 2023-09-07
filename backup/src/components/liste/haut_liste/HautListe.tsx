import React, { FC } from 'react'
import Search from './Search'
import Others from './Others'

type COMPONENT_TYPE = {
    title: string
    setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>
}

const HautListe: FC<COMPONENT_TYPE> = (props) => {
    const { title, setOpenAddModal } = props

    return (
        <div className='haut_liste'>
            <Search />
            <Others title={title} setOpenAddModal={setOpenAddModal} />
        </div>
    )
}

export default HautListe