import Admin from '../pages/Admin'
import Customer from '../pages/Customer'
import Dashboard from '../pages/Dashboard'
import ForgetPassword from '../pages/ForgetPassword'
import Login from '../pages/Login'
import Partner from '../pages/Partner'
import { PAGE_COMPONENT_TYPE } from './types'

export const routeConnected: Array<{ path: string, Element: PAGE_COMPONENT_TYPE }> = [
    { path: '/', Element: Dashboard },
    { path: '/admin', Element: Admin },
    { path: '/customer', Element: Customer },
    { path: '/partner', Element: Partner },
]

export const routeNotConnected: Array<{ path: string, Element: PAGE_COMPONENT_TYPE }> = [
    { path: '/', Element: Login },
    { path: '/forget_password', Element: ForgetPassword },

    // { path: '/admin', Element: Admin },
]