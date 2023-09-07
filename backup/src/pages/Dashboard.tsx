import React from 'react'
import { page_dashboard } from '../utils/page_name'
import PageContainer from '../components/page_container/PageContainer'
import TitleLink from '../components/title_link/TitleLink'

const Dashboard = () => {

    return (
        <PageContainer title_page={page_dashboard}>
            <div className='right_part_container'>
                <TitleLink title='Dashboard' links={['Dashboard']} />

            </div>
        </PageContainer>
    )
}

export default Dashboard