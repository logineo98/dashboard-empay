import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { site_name } from '../../utils/page_name'

// importation icons
import { AiOutlineFullscreen, AiOutlineLogout, AiOutlineMenu, AiOutlineSearch, AiOutlineSetting } from 'react-icons/ai'
import { PiMoonLight } from 'react-icons/pi'
import { HiOutlineSun } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'
import { FaRegUserCircle } from 'react-icons/fa'
import { MdNotificationsNone } from 'react-icons/md'

// importation images
import logo from '../../assets/images/logo.jpg'

const Header = () => {

    const [light, setLight] = useState(true)
    const [seeInputSearch, setSeeInputSearch] = useState(false)
    const [search, setSearch] = useState('')

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log(search)
    }

    const displayOrCloseSidebar = () => {
        const sidebar = document.querySelector('.sidebar') as HTMLDivElement
        const right_part = document.querySelector('.right_part') as HTMLDivElement

        sidebar.classList.toggle('active_icon')
        right_part.classList.toggle('active_icon')
    }

    return (
        <header className={light ? 'header' : 'header dark'}>
            <div className='header_container'>
                <div className='logo_site_name_icon_menu_container'>
                    <Link to='/' className='logo_site_name'>
                        <div className='logo_container'>
                            <img src={logo} alt='logo du site' />
                        </div>
                        <span className='site_name'> {site_name} </span>
                    </Link>
                    <button className='icon_menu_container' onClick={displayOrCloseSidebar}>
                        <AiOutlineMenu className='icon' />
                    </button>
                </div>

                {!seeInputSearch ?
                    <div className='full_screen_search_options_profil_container'>
                        <div className='full_screen_search_container'>
                            <button className='full_screen_icon_container'>
                                <AiOutlineFullscreen className='icon' />
                            </button>

                            <div className='search_container' onClick={() => { setSeeInputSearch(true); }}>
                                <AiOutlineSearch className='search_icon' />
                                <span className='search'>Recherche...</span>
                                <p className='text_shortcut'>Ctrl + M</p>
                            </div>
                        </div>

                        <div className='options_profil_container'>
                            <button className='icon_container'>
                                <MdNotificationsNone className='icon' />
                            </button>

                            <button className='icon_container'>
                                {light ? <PiMoonLight className='icon' onClick={() => setLight(prev => !prev)} /> : <HiOutlineSun className='icon' onClick={() => setLight(prev => !prev)} />}
                            </button>

                            <button className='profil_container'>
                                <div className='profil_img_container'>
                                    <img src={logo} alt={'profil de l\'utilisateur'} />
                                </div>
                                <AiOutlineSetting className='setting_icon' />

                                <div className='options_container'>
                                    <Link to='/' className='option'>
                                        <FaRegUserCircle className='option_icon' />
                                        <span className='option_name'>Profil</span>
                                    </Link>
                                    <Link to='/' className='option'>
                                        <AiOutlineSetting className='option_icon' />
                                        <span className='option_name'>Réglage</span>
                                    </Link>
                                    <p className='option'>
                                        <AiOutlineLogout className='option_icon' />
                                        <span className='option_name'>Se deconnecter</span>
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div> :
                    <div className='search_close_container'>
                        <form className='search_close_container' onSubmit={handleSearch}>
                            <input type='search' name='search' id='search' value={search} placeholder='Recherche...' onChange={e => setSearch(e.target.value)} />
                        </form>

                        <button onClick={() => { setSeeInputSearch(false) }}> <IoMdClose className='icon' /> </button>
                    </div>
                }
            </div>
        </header>
    )
}

export default Header