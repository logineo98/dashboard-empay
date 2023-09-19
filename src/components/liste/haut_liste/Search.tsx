import React, { FC, useEffect, useState } from 'react'

// importation icons
import { AiOutlineSearch } from 'react-icons/ai'

type COMPONENT_TYPE = {
    data: any[]
    setFilteredDataSearch: React.Dispatch<React.SetStateAction<any[]>>
}

const Search: FC<COMPONENT_TYPE> = (props) => {
    const { data, setFilteredDataSearch } = props

    const [search, setSearch] = useState('')

    useEffect(() => {
        setFilteredDataSearch(data)
    }, [data])

    useEffect(() => {
        const result = data?.filter(item =>
            item?.username?.toLowerCase().includes(search.toLowerCase()) ||
            item?.name?.toLowerCase().includes(search.toLowerCase()) ||
            item?.email?.toLowerCase().includes(search.toLowerCase()) ||
            item?.role?.toLowerCase().includes(search.toLowerCase()) ||
            item?.phone?.toLowerCase().includes(search.toLowerCase()) ||
            item?.firstname?.toLowerCase().includes(search.toLowerCase()) ||
            item?.address?.toLowerCase().includes(search.toLowerCase()) ||
            item?.accountUBA?.toLowerCase().includes(search.toLowerCase()) ||
            item?.description?.toLowerCase().includes(search.toLowerCase()) ||
            item?.tarif?.toLowerCase().includes(search.toLowerCase())
        )

        setFilteredDataSearch(result)
    }, [search, data])

    return (
        <div className='search_container'>
            <AiOutlineSearch className='icon' size={20} onClick={() => document.getElementById('search')?.focus()} />
            <input type='search' name='search' id='search' placeholder='Rechercher ...' onChange={(e) => setSearch && setSearch(e.target.value)} />
        </div>
    )
}

export default Search