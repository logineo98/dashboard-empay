import { toast } from 'react-toastify'
import { ADD_ADMIN, EDIT_ADMIN, ERROR_ADMIN, GET_ADMIN, GET_ALL_ADMINS, IS_CONNECTED, LOADING_ADMIN, admin } from '../constants'
import axios from 'axios'
import { ADMIN_TYPE } from '../../utils/types'

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

        const response = await axios.post(`${admin}/${data?.id}`, data, { headers: { Authorization: `Bearer ${token}` } })

        admin_connected?.id === data.id && localStorage.setItem('admin', JSON.stringify(response.data))

        toast.success('L\'administrateur a été modifié avec succès.')

        setSeeModalDisplayEditDelete(false)

        dispatch({ type: EDIT_ADMIN, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data)
        dispatch(_errorAdmin(error?.response?.data))
    }
}