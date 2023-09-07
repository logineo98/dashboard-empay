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
        const result = data?.filter(data =>
            data?.username?.toLowerCase().match(search.toLocaleLowerCase()) ||
            data?.name?.toLowerCase().match(search.toLocaleLowerCase()) ||
            data?.email?.toLowerCase().match(search.toLocaleLowerCase()) ||
            data?.role?.toLowerCase().match(search.toLocaleLowerCase())
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