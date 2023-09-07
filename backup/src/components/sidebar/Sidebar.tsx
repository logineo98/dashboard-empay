import React from 'react'
import Menu from './Menu'
import { menus } from '../../utils/menus'

const Sidebar = () => (
    <ul className='sidebar '>
        {menus.map((menu, i) => <Menu key={i} menu_name={menu.menu_name} menu_url={menu.menu_url} menu_icon={menu.menu_icon} submenus={menu.submenus} />)}
    </ul>
)

export default Sidebar