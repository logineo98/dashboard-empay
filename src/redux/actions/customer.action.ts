import axios from 'axios'
import { ACTIVATED_OR_UNACTIVATED_ACCOUNT_CUSTOMER, ERROR_CUSTOMER, GET_ALL_CUSTOMERS, LOADING_CUSTOMER, admin, customer } from '../constants'
import { toast } from 'react-toastify'

const token = localStorage.getItem('token')

export const _loadingCustomer = () => (dispatch: any) => {
    dispatch({ type: LOADING_CUSTOMER })
}

export const _errorCustomer = (payload: any) => (dispatch: any) => {
    dispatch({ type: ERROR_CUSTOMER, payload })
}

export const _getAllCustomers = () => async (dispatch: any) => {
    try {
        dispatch(_loadingCustomer())

        const response = await axios.get(`${customer}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ALL_CUSTOMERS, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data)
        dispatch(_errorCustomer(error?.response?.data))
    }
}

export const _activated_or_unactivated_account_customer = (data: { id: string, status: boolean }, setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch: any) => {
    try {
        dispatch(_loadingCustomer())

        const response = await axios.post(`${admin}/validate-customer`, data, { headers: { Authorization: `Bearer ${token}` } })

        data.status ? toast.success('Le compte de l\'utilisateur a été activé avec succès.') : toast.success('Le compte de l\'utilisateur a été désactivé avec succès.')

        setSeeModalDisplayEditDelete(false)

        dispatch({ type: ACTIVATED_OR_UNACTIVATED_ACCOUNT_CUSTOMER, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data)
        dispatch(_errorCustomer(error?.response?.data))
    }
}