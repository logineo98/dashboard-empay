import React, { FC, useState } from 'react'

// importation icons
import { AiOutlinePlus } from 'react-icons/ai'
import { GoFilter } from 'react-icons/go'
import { CiExport, CiImport } from 'react-icons/ci'
import { MdKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md'

type COMPONENT_TYPE = {
    title: string
    setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Others: FC<COMPONENT_TYPE> = (props) => {
    const { setOpenAddModal } = props

    const [open, setOpen] = useState(false)

    const openModal = () => {
        setOpenAddModal(true)
    }

    return (
        <div className='other_container'>
            {open &&
                <>
                    <CiImport className='icon' onClick={() => { }} title='Importer' />
                    <CiExport className='icon' onClick={() => { }} title='Exporter' />
                    <GoFilter className='icon' onClick={() => { }} title='Filtrer' />
                    <AiOutlinePlus className='icon' onClick={openModal} title='Ajouter' />
                </>
            }

            {open ?
                <MdKeyboardArrowRight className='icon' onClick={() => { setOpen(prev => !prev) }} title='Fermer' /> :
                <MdOutlineKeyboardArrowLeft className='icon' onClick={() => { setOpen(prev => !prev) }} title='Ouvrir' />
            }

        </div>
    )
}

export default Others