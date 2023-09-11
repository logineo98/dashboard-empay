import React, { useEffect, useState } from 'react'
import { page_partner } from '../utils/page_name'
import PageContainer from '../components/page_container/PageContainer'
import TitleLink from '../components/title_link/TitleLink'
import { useDispatch } from 'react-redux'
import { _getAllPartners } from '../redux/actions/partner.action'
import ListePartner from '../components/listes/ListePartner'

const Partner = () => {

    const [openAddModal, setOpenAddModal] = useState(false)

    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(_getAllPartners())
    }, [dispatch])

    return (
        <PageContainer title_page={page_partner}>
            <div className='right_part_container'>
                <TitleLink title='Partenaire' links={['Partenaire']} />

                {/* <AddAdmin openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} /> */}
                <ListePartner title='partner' setOpenAddModal={setOpenAddModal} />
            </div>
        </PageContainer>
    )
}

export default Partner