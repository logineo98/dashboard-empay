import React from 'react'

// importation icons
import { AiOutlineSearch } from 'react-icons/ai'

const Search = () => {

    return (
        <div className='search_container'>
            <AiOutlineSearch className='icon' size={20} onClick={() => document.getElementById('search')?.focus()} />
            <input type='text' name='search' id='search' placeholder='Rechercher ...' />
        </div>
    )
}

export default Search