import React, { useEffect, useState } from 'react'
import { page_admin } from '../utils/page_name'
import PageContainer from '../components/page_container/PageContainer'
import TitleLink from '../components/title_link/TitleLink'
import ListeAdmin from '../components/listes/ListeAdmin'
import AddAdmin from '../components/add/AddAdmin'
import { useDispatch } from 'react-redux'
import { _getAllAdmins } from '../redux/actions/admin.action'

const Admin = () => {

    const [openAddModal, setOpenAddModal] = useState(false)

    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(_getAllAdmins())
    }, [dispatch])

    return (
        <PageContainer title_page={page_admin}>
            <div className='right_part_container'>
                <TitleLink title='Administrateur' links={['Administrateur']} />

                <AddAdmin openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} />
                <ListeAdmin title='admin' setOpenAddModal={setOpenAddModal} />
            </div>
        </PageContainer>
    )
}

export default Admin