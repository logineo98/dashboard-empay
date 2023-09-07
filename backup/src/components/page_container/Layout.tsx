import React from 'react'
import { PAGE_COMPONENT_TYPE } from '../../utils/types'
import Header from './Header'
import Sidebar from '../sidebar/Sidebar'

const Layout: PAGE_COMPONENT_TYPE = ({ children }) => {

    return (
        <div className='page_container'>
            <Header />

            <div className='body_container'>
                <Sidebar />

                <div className='right_part'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout