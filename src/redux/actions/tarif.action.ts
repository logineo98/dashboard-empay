import { toast } from 'react-toastify'
import { ADD_TARIF, DELETE_TARIF, EDIT_TARIF, ERROR_TARIF, GET_ALL_TARIFS, LOADING_TARIF, tarif } from '../constants'
import axios from 'axios'
import { TARIF_TYPE } from '../../utils/types'

const token = localStorage.getItem('token')

const _loadingTarif = () => (dispatch: any) => {
    dispatch({ type: LOADING_TARIF })
}

const _errorTarif = (payload: any) => (dispatch: any) => {
    dispatch({ type: ERROR_TARIF, payload })
}

export const _getAllTarifs = () => async (dispatch: any) => {
    try {
        dispatch(_loadingTarif())

        const response = await axios.get(`${tarif}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ALL_TARIFS, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data)
        dispatch(_errorTarif(error?.response?.data))
    }
}

export const _addTarif = (data: TARIF_TYPE, setAddTarifData: React.Dispatch<React.SetStateAction<TARIF_TYPE>>) => async (dispatch: any) => {
    try {
        dispatch(_loadingTarif())

        const response = await axios.post(`${tarif}/register`, data, { headers: { Authorization: `Bearer ${token}` } })

        toast.success('Le tarif a été ajouté avec succès.')

        setAddTarifData({ tarif: '', description: '' })

        dispatch({ type: ADD_TARIF, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data)
        dispatch(_errorTarif(error?.response?.data))
    }
}

export const _editTarif = (id: string, data: TARIF_TYPE, setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch: any) => {
    try {
        dispatch(_loadingTarif())

        const response = await axios.put(`${tarif}/${id}`, data, { headers: { Authorization: `Bearer ${token}` } })

        toast.success('Le tarif a été modifié avec succès.')

        setSeeModalDisplayEditDelete(false)

        dispatch({ type: EDIT_TARIF, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data)
        dispatch(_errorTarif(error?.response?.data))
    }
}

export const _deleteTarif = (id: string, setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch: any) => {
    try {
        dispatch(_loadingTarif())

        const response = await axios.delete(`${tarif}/${id}`, { headers: { Authorization: `Bearer ${token}` } })

        toast.success('Le tarif a été supprimé avec succès.')

        setSeeModalDisplayEditDelete(false)

        dispatch({ type: DELETE_TARIF, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data)
        dispatch(_errorTarif(error?.response?.data))
    }
}