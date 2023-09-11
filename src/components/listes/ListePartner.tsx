import React, { FC, useState } from 'react'
import ListeContainer from '../liste/ListeContainer'
import Liste from '../liste/Liste'
import { COLUMN_DATA_TABLE_TYPE } from '../../utils/types'
import { ROOT_REDUCER_TYPE } from '../../redux/store'
import { useSelector } from 'react-redux'
import Popup from 'reactjs-popup'

// importation icons
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'
import { CiEdit } from 'react-icons/ci'
import { BsThreeDotsVertical } from 'react-icons/bs'
import PartnerModal from '../liste/modal_display_edit_delete/PartnerModal'

type COMPONENT_TYPE = {
    title: string
    setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ListePartner: FC<COMPONENT_TYPE> = (props) => {
    const { title, setOpenAddModal } = props

    const [value, setValue] = useState<COLUMN_DATA_TABLE_TYPE>()
    const [seeModalDisplayEditDelete, setSeeModalDisplayEditDelete] = useState(false)
    const [type, setType] = useState('')

    const { allPartners } = useSelector((state: ROOT_REDUCER_TYPE) => state.partner)

    const data: Array<COLUMN_DATA_TABLE_TYPE> = allPartners

    const handleDisplay = (type: string, value: COLUMN_DATA_TABLE_TYPE) => {
        if (type === 'afficher') {
            setSeeModalDisplayEditDelete(true)
            setValue(value)
            setType('afficher')
        } else if (type === 'modifier') {
            setSeeModalDisplayEditDelete(true)
            setValue(value)
            setType('modifier')
        } else if (type === 'supprimer') {
            setSeeModalDisplayEditDelete(true)
            setValue(value)
            setType('supprimer')
        }
    }

    const columns = [
        { name: <h3>#</h3>, selector: (row: COLUMN_DATA_TABLE_TYPE, i: number) => i + 1 },
        { name: <h3>Nom</h3>, selector: (row: COLUMN_DATA_TABLE_TYPE) => row.name, sortable: true },
        { name: <h3>Description</h3>, selector: (row: COLUMN_DATA_TABLE_TYPE) => row.description, sortable: true },
        {
            name: <h3 style={{ width: '100%', textAlign: 'center' }}>Action</h3>,
            cell: (row: COLUMN_DATA_TABLE_TYPE) => (
                <div className='display_edit_delete' style={{ width: '100%', textAlign: 'center' }}>
                    <Popup arrow={false} trigger={<span className='vertical_icon_container'><BsThreeDotsVertical className='vertical_icon' /></span>} position='left center'>
                        <div className='display_edit_delete_container'>
                            <div className='container' onClick={() => handleDisplay('afficher', row)}>
                                <div className='container_icon'> <AiOutlineEye /> </div>
                                <div className='container_name'>Afficher</div>
                            </div>

                            <div className='container' onClick={() => handleDisplay('modifier', row)}>
                                <div className='container_icon'> <CiEdit /> </div>
                                <div className='container_name'>Modifier</div>
                            </div>

                            <div className='container' onClick={() => handleDisplay('supprimer', row)}>
                                <div className='container_icon'> <AiOutlineDelete /> </div>
                                <div className='container_name'>Supprimer</div>
                            </div>
                        </div>
                    </Popup>
                </div>
            )
        },
    ]

    return (
        <ListeContainer name='Liste des partenaires'>
            <>
                <Liste title={title} columns={columns} data={data} setOpenAddModal={setOpenAddModal} />

                <PartnerModal type={type} row={value as COLUMN_DATA_TABLE_TYPE} seeModalDisplayEditDelete={seeModalDisplayEditDelete} setSeeModalDisplayEditDelete={setSeeModalDisplayEditDelete} />
            </>
        </ListeContainer>
    )
}

export default ListePartner