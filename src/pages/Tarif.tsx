import React, { useEffect, useState } from 'react'
import PageContainer from '../components/page_container/PageContainer'
import { page_tarif } from '../utils/page_name'
import TitleLink from '../components/title_link/TitleLink'
import AddTarif from '../components/add/AddTarif'
import { useDispatch } from 'react-redux'
import { _getAllTarifs } from '../redux/actions/tarif.action'
import ListeTarif from '../components/listes/ListeTarif'

const Tarif = () => {
    const [openAddModal, setOpenAddModal] = useState(false)

    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(_getAllTarifs())
    }, [dispatch])

    return (
        <PageContainer title_page={page_tarif}>
            <div className='right_part_container'>
                <TitleLink title='Tarif' links={['Tarif']} />

                <AddTarif openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} />
                <ListeTarif title='tarif' setOpenAddModal={setOpenAddModal} />
            </div>
        </PageContainer>
    )
}

export default Tarif