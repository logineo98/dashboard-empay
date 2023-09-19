import { toast } from 'react-toastify'
import { ADD_ADMIN, DELETE_ADMIN, EDIT_ADMIN, ERROR_ADMIN, GET_ADMIN, GET_ADMIN_BY_USERNAME_OR_EMAIL_OR_PHONE, GET_ALL_ADMINS, IS_CONNECTED, LOADING_ADMIN, RESEND_CODE, RESET_PASSWORD, VERIFY_CODE, admin } from '../constants'
import axios from 'axios'
import { ADMIN_TYPE, FORGET_DISPLAY_OPTIONS } from '../../utils/types'

const token = localStorage.getItem('token')
const _admin = localStorage.getItem('admin')

export const _loadingAdmin = () => (dispatch: any) => {
    dispatch({ type: LOADING_ADMIN })
}

export const _errorAdmin = (payload: any) => (dispatch: any) => {
    dispatch({ type: ERROR_ADMIN, payload })
}

export const _isAdminConnected = (payload: boolean) => (dispatch: any) => {
    dispatch({ type: IS_CONNECTED, payload })
}

export const _getAdminByUsernameOrEmail = (usernameOrEmail: string, setDisplayOptions: React.Dispatch<React.SetStateAction<FORGET_DISPLAY_OPTIONS>>) => async (dispatch: any) => {
    try {
        dispatch(_loadingAdmin())

        const response = await axios.post(`${admin}/forgot`, { username: usernameOrEmail }, { headers: { Authorization: `Bearer ${token}` } })

        setDisplayOptions({ search_email_or_username_or_phone: false, write_code_send: true, write_new_password: false, succes_modify_password: false })
        toast.success('L\'administrateur correspondant a été trouvé')

        dispatch({ type: GET_ADMIN_BY_USERNAME_OR_EMAIL_OR_PHONE, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data)
        dispatch(_errorAdmin(error?.response?.data))
    }
}

export const _resendCode = (usernameOrEmail: string) => async (dispatch: any) => {
    try {
        dispatch(_loadingAdmin())

        const response = await axios.post(`${admin}/forgot`, { username: usernameOrEmail }, { headers: { Authorization: `Bearer ${token}` } })

        toast.success('Le code vous a été renvoyé avec succès.')

        dispatch({ type: RESEND_CODE, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data)
        dispatch(_errorAdmin(error?.response?.data))
    }
}

export const _verifyCode = (data: { id: string, code: string }, setDisplayOptions: React.Dispatch<React.SetStateAction<FORGET_DISPLAY_OPTIONS>>) => async (dispatch: any) => {
    try {
        dispatch(_loadingAdmin())
        const { id, code } = data

        const response = await axios.post(`${admin}/verify-code`, { id, code }, { headers: { Authorization: `Bearer ${token}` } })

        setDisplayOptions({ search_email_or_username_or_phone: false, write_code_send: false, write_new_password: true, succes_modify_password: false })
        toast.success('Le code saisi est correct.')

        dispatch({ type: VERIFY_CODE, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data)
        dispatch(_errorAdmin(error?.response?.data))
    }
}

export const _resetPassword = (data: { id: string, password: string }, setDisplayOptions: React.Dispatch<React.SetStateAction<FORGET_DISPLAY_OPTIONS>>) => async (dispatch: any) => {
    try {
        dispatch(_loadingAdmin())
        const { id, password } = data

        const response = await axios.post(`${admin}/reset-password`, { id, password }, { headers: { Authorization: `Bearer ${token}` } })

        setDisplayOptions({ search_email_or_username_or_phone: false, write_code_send: false, write_new_password: false, succes_modify_password: true })
        toast.success('Modification effectuée avec succès.')

        dispatch({ type: RESET_PASSWORD, payload: { isPasswordModify: true, data: response.data } })
    } catch (error: any) {
        toast.error(error?.response?.data)
        dispatch(_errorAdmin(error?.response?.data))
    }
}

export const _getAdmin = () => async (dispatch: any) => {
    try {
        dispatch(_loadingAdmin())

        _admin ? dispatch({ type: GET_ADMIN, payload: JSON.parse(_admin) }) : dispatch({ type: GET_ADMIN, payload: null })
    } catch (error: any) {
        toast.error(error?.response?.data)
        dispatch(_errorAdmin(error?.response?.data))
    }
}

export const _getAllAdmins = () => async (dispatch: any) => {
    try {
        dispatch(_loadingAdmin())

        const response = await axios.get(`${admin}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ALL_ADMINS, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data)
        dispatch(_errorAdmin(error?.response?.data))
    }
}

export const _addAdmin = (data: ADMIN_TYPE, setAddAdminData: React.Dispatch<React.SetStateAction<ADMIN_TYPE>>) => async (dispatch: any) => {
    try {
        dispatch(_loadingAdmin())

        const response = await axios.post(`${admin}/register`, data, { headers: { Authorization: `Bearer ${token}` } })

        toast.success('L\'administrateur a été ajouté avec succès.')

        setAddAdminData({ username: '', name: '', email: '', password: '' })

        dispatch({ type: ADD_ADMIN, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data)
        dispatch(_errorAdmin(error?.response?.data))
    }
}

export const _editAdmin = (data: ADMIN_TYPE, setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch: any) => {
    try {
        dispatch(_loadingAdmin())
        const admin_connected = _admin ? JSON.parse(_admin) : null

        const response = await axios.put(`${admin}/${data?.id}`, data, { headers: { Authorization: `Bearer ${token}` } })

        admin_connected?.id === data.id && localStorage.setItem('admin', JSON.stringify(response.data))

        toast.success('L\'administrateur a été modifié avec succès.')

        setSeeModalDisplayEditDelete(false)

        dispatch({ type: EDIT_ADMIN, payload: { data: response.data, admin_connected: admin_connected?.id === data.id ? response.data : admin_connected } })
    } catch (error: any) {
        toast.error(error?.response?.data)
        dispatch(_errorAdmin(error?.response?.data))
    }
}

export const _deleteAdmin = (id: string, setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch: any) => {
    try {
        dispatch(_loadingAdmin())

        const response = await axios.delete(`${admin}/${id}`, { headers: { Authorization: `Bearer ${token}` } })

        toast.success('L\'administrateur a été supprimé avec succès.')

        setSeeModalDisplayEditDelete(false)

        dispatch({ type: DELETE_ADMIN, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data)
        dispatch(_errorAdmin(error?.response?.data))
    }
}