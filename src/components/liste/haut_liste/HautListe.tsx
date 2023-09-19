import React, { FC, useEffect, useState } from 'react'
import Search from './Search'
import Others from './Others'
import Loading from '../../loading/Loading'
import { useSelector } from 'react-redux'
import { ROOT_REDUCER_TYPE } from '../../../redux/store'

type COMPONENT_TYPE = {
    title: string
    setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>
    data: any[]
    setFilteredDataSearch: React.Dispatch<React.SetStateAction<any[]>>
}

const HautListe: FC<COMPONENT_TYPE> = (props) => {
    const { title, setOpenAddModal, data, setFilteredDataSearch } = props

    const [reduxLoading, setReduxLoading] = useState(false)

    const { loadingAdmin } = useSelector((state: ROOT_REDUCER_TYPE) => state.admin)
    const { loadingCustomer } = useSelector((state: ROOT_REDUCER_TYPE) => state.customer)
    const { loadingPartner } = useSelector((state: ROOT_REDUCER_TYPE) => state.partner)
    const { loadingTarif } = useSelector((state: ROOT_REDUCER_TYPE) => state.tarif)

    useEffect(() => {
        switch (title) {
            case 'admin': setReduxLoading(loadingAdmin); break
            case 'customer': setReduxLoading(loadingCustomer); break
            case 'partner': setReduxLoading(loadingPartner); break
            case 'tarif': setReduxLoading(loadingTarif); break

            default: setReduxLoading(false); break
        }
    }, [title, loadingAdmin, loadingCustomer, loadingPartner, loadingTarif])

    return (
        <div className='haut_liste'>
            <Search data={data} setFilteredDataSearch={setFilteredDataSearch} />
            {reduxLoading && <Loading width='30' />}
            <Others title={title} setOpenAddModal={setOpenAddModal} />
        </div>
    )
}

export default HautListe