import { IconType } from 'react-icons'

// importation icons
import { AiOutlineDashboard } from 'react-icons/ai'
import { CiMobile3 } from 'react-icons/ci'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import { PiUsersThreeLight } from 'react-icons/pi'

type COMPONENT_TYPE = Array<{
    menu_name: string, menu_url: string, menu_icon: IconType,
    submenus?: Array<{ submenu_name: string, submenu_url: string }>
}>

export const menus: COMPONENT_TYPE = [
    {
        menu_name: 'Tableau de bord', menu_url: '/', menu_icon: AiOutlineDashboard,
    },
    {
        menu_name: 'Partenaire', menu_url: '/partner', menu_icon: PiUsersThreeLight,
    },
    {
        menu_name: 'Client', menu_url: '/customer', menu_icon: CiMobile3,
    },
    {
        menu_name: 'Administrateur', menu_url: '/admin', menu_icon: MdOutlineAdminPanelSettings,
    },
]