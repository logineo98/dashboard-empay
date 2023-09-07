import { FC } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

// importation icons
import { IconType } from 'react-icons'
import { AiOutlinePlus } from 'react-icons/ai'

type MENU_TYPE = {
    menu_name: string
    menu_url: string, menu_icon: IconType,
    submenus?: Array<{ submenu_name: string, submenu_url: string }>
}

const Menu: FC<MENU_TYPE> = (props) => {
    let { menu_name, menu_url, menu_icon, submenus } = props
    const { pathname } = useLocation()

    const MenuIcon = menu_icon

    return (
        <li className='menu '>
            <NavLink to={menu_url} className={({ isActive }) => { if (isActive || submenus?.map(submenu => submenu.submenu_url).includes(pathname)) return 'menu_icon_name_fleche active'; else return 'menu_icon_name_fleche' }}>
                <div className='menu_icon_name'>
                    <MenuIcon className='menu_icon' />
                    <span className='menu_name'> {menu_name} </span>
                </div>
                {submenus && <AiOutlinePlus className='fleche' />}
            </NavLink>

            {submenus &&
                <ul className='sub_menu_container'>
                    {submenus?.map((submenu, i) => (
                        <li className='sub_menu' key={i}>
                            <NavLink to={submenu.submenu_url} className='sub_menu_name_container'>
                                <span className='sub_menu_name'>{submenu.submenu_name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            }
        </li>
    )
}

export default Menu