import React, { FC, useState } from 'react'
import ListeContainer from '../liste/ListeContainer'
import Liste from '../liste/Liste'
import { COLUMN_DATA_TABLE_TYPE } from '../../utils/types'
import Popup from 'reactjs-popup'
import { useSelector } from 'react-redux'
import { ROOT_REDUCER_TYPE } from '../../redux/store'
import CustomerModal from '../liste/modal_display_edit_delete/CustomerModal'

// importation icons
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineEye } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'

type COMPONENT_TYPE = {
    title: string
    setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ListCustomer: FC<COMPONENT_TYPE> = (props) => {
    const { title, setOpenAddModal } = props

    const [value, setValue] = useState<COLUMN_DATA_TABLE_TYPE>()
    const [seeModalDisplayEditDelete, setSeeModalDisplayEditDelete] = useState(false)
    const [type, setType] = useState('')

    const { allCustomers } = useSelector((state: ROOT_REDUCER_TYPE) => state.customer)

    const data: Array<COLUMN_DATA_TABLE_TYPE> = allCustomers
    // const data = [
    //     { id: '1', name: 'Diabaté', firstname: 'Cheick Oumar', email: 'c.oumar@gmail.com', phone: '71805703', status: true, birthday: new Date(), address: 'Kabala', accountUBA: 'fqsd78', document: 'https://www.imagespourtoi.com/lesimages/jeanne-serge/image-jeanne-serge-1.jpg', photo: 'https://www.imagespourtoi.com/lesimages/sangoku/image-sangoku-3.jpg', createdAt: new Date(), updatedAt: new Date(), },
    //     { id: '2', name: 'Coulibaly', firstname: 'Souleymane', email: 'soul@gmail.com', phone: '73030732', status: false, birthday: new Date(), address: 'Kalana', accountUBA: 'fsdf85', document: 'https://www.imagespourtoi.com/lesimages/jeanne-serge/image-jeanne-serge-1.jpg', photo: 'https://www.imagespourtoi.com/lesimages/sangoku/image-sangoku-3.jpg', createdAt: new Date(), updatedAt: new Date(), },
    //     { id: '3', name: 'Dolo', firstname: 'akougnon', email: 'dolo@gmail.com', phone: '76465385', status: true, birthday: new Date(), address: 'Sevaré', accountUBA: 'fsdf98', document: 'https://www.imagespourtoi.com/lesimages/jeanne-serge/image-jeanne-serge-1.jpg', photo: 'https://www.imagespourtoi.com/lesimages/sangoku/image-sangoku-3.jpg', createdAt: new Date(), updatedAt: new Date(), },
    // ]

    const handleDisplay = (type: string, value: COLUMN_DATA_TABLE_TYPE) => {
        if (type === 'afficher') {
            setSeeModalDisplayEditDelete(true)
            setValue(value)
            setType('afficher')
        } else if (type === 'activer_ou_desactiver') {
            setSeeModalDisplayEditDelete(true)
            setValue(value)
            setType('activer_ou_desactiver')
        }
    }

    const columns = [
        { name: <h3>#</h3>, selector: (row: COLUMN_DATA_TABLE_TYPE, i: number) => i + 1 },
        { name: <h3>Compte UBA</h3>, selector: (row: COLUMN_DATA_TABLE_TYPE) => row.accountUBA, sortable: true },
        { name: <h3>Nom</h3>, selector: (row: COLUMN_DATA_TABLE_TYPE) => row.name, sortable: true },
        { name: <h3>Prénom</h3>, selector: (row: COLUMN_DATA_TABLE_TYPE) => row.firstname, sortable: true },
        { name: <h3>Email</h3>, selector: (row: COLUMN_DATA_TABLE_TYPE) => row.email, sortable: true },
        { name: <h3>Téléphone</h3>, selector: (row: COLUMN_DATA_TABLE_TYPE) => row.phone, sortable: true },
        { name: <h3>État du compte</h3>, selector: (row: COLUMN_DATA_TABLE_TYPE) => row.status ? <span className='column success'>activé</span> : <span className='column error'>non activé</span>, },
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

                            <div className='container' onClick={() => handleDisplay('activer_ou_desactiver', row)}>
                                <div className='container_icon'> {row?.status ? <AiOutlineCloseCircle /> : <AiOutlineCheckCircle />} </div>
                                <div className='container_name'> {row?.status ? 'Désactiver' : 'Activer'} </div>
                            </div>
                        </div>
                    </Popup>
                </div>
            )
        },
    ]

    return (
        <ListeContainer name='Liste des clients'>
            <>
                <Liste title={title} columns={columns} data={data} setOpenAddModal={setOpenAddModal} />

                <CustomerModal type={type} row={value as COLUMN_DATA_TABLE_TYPE} seeModalDisplayEditDelete={seeModalDisplayEditDelete} setSeeModalDisplayEditDelete={setSeeModalDisplayEditDelete} />
            </>
        </ListeContainer>
    )
}

export default ListCustomer