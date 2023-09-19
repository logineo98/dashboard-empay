import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import PageContainer from '../components/page_container/PageContainer'
import { page_customer } from '../utils/page_name'
import TitleLink from '../components/title_link/TitleLink'
import { _getAllCustomers } from '../redux/actions/customer.action'
import ListCustomer from '../components/listes/ListeCustomer'

const Client = () => {

    const [openAddModal, setOpenAddModal] = useState(false)

    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(_getAllCustomers())
    }, [dispatch])

    return (
        <PageContainer title_page={page_customer}>
            <div className='right_part_container'>
                <TitleLink title='Client' links={['Client']} />

                <ListCustomer title='customer' setOpenAddModal={setOpenAddModal} />
            </div>
        </PageContainer>
    )
}

export default Client