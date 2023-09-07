import React, { useEffect } from 'react'
import { PAGE_COMPONENT_TYPE } from '../../utils/types'
import Divider from '../divider/Divider'
import { Link } from 'react-router-dom'

// importation icons
import { BiUserCircle } from 'react-icons/bi'
import { RiLockPasswordLine } from 'react-icons/ri'
import { PiMoonLight } from 'react-icons/pi'
import { HiOutlineSun } from 'react-icons/hi'

// importation images
import logo from '../../assets/images/logo.jpg'

const LoginForgetContainer: PAGE_COMPONENT_TYPE = ({ title, title_page, light, setLight, children }) => {

    useEffect(() => {
        document.title = title_page as string
    }, [title_page])

    return (
        <div className={light ? 'login' : 'login dark'}>

            <button className='light_dark_icon_container'>
                {light ? <PiMoonLight className='icon' onClick={() => setLight && setLight(prev => !prev)} /> : <HiOutlineSun className='icon' onClick={() => setLight && setLight(prev => !prev)} />}
            </button>

            <div className='container'>
                <div className='logo_img'>
                    <Link to='/' className='img_container'>
                        <img src={logo} alt='logo du site' />
                    </Link>
                </div>

                <div className='icon_title'>
                    {title === 'login' ? <BiUserCircle className='icon' /> : <RiLockPasswordLine className='icon' />}
                    {title === 'login' ? <h3 className='title'>Se connecter</h3> : <h3 className='title'>Mot de passe oublié ?</h3>}
                </div>

                <Divider />

                <div className='form_container'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default LoginForgetContainer