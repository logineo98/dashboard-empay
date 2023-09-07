import { IconType } from 'react-icons'
import { AiOutlineDashboard } from 'react-icons/ai'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'

export const menus: Array<{ menu_name: string, menu_url: string, menu_icon: IconType, submenus?: Array<{ submenu_name: string, submenu_url: string }> }> = [
    {
        menu_name: 'Tableau de bord', menu_url: '/', menu_icon: AiOutlineDashboard,
    },
    {
        menu_name: 'Administrateurs', menu_url: '/admin', menu_icon: MdOutlineAdminPanelSettings,
        submenus: [
            { submenu_name: 'Sub menu1', submenu_url: '/admin' },
            { submenu_name: 'Sub menu2', submenu_url: '/admin1' },
        ]
    },
    {
        menu_name: 'Notification', menu_url: '/notif', menu_icon: AiOutlineDashboard,
        submenus: [
            { submenu_name: 'Sub menu1', submenu_url: '/notif' },
            { submenu_name: 'Sub menu2', submenu_url: '/notif1' },
        ]
    },
]