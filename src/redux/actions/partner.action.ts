import axios from 'axios'
import { ADD_PARTNER, DELETE_PARTNER, EDIT_PARTNER, ERROR_PARTNER, GET_ALL_PARTNERS, LOADING_PARTNER, partner } from '../constants'
import { toast } from 'react-toastify'
import { PARTNER_TYPE } from '../../utils/types'

const token = localStorage.getItem('token')

const _loadingPartner = () => (dispatch: any) => {
    dispatch({ type: LOADING_PARTNER })
}

const _errorPartner = (payload: any) => (dispatch: any) => {
    dispatch({ type: ERROR_PARTNER, payload })
}

export const _getAllPartners = () => async (dispatch: any) => {
    try {
        dispatch(_loadingPartner())

        const response = await axios.get(`${partner}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ALL_PARTNERS, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data)
        dispatch(_errorPartner(error?.response?.data))
    }
}

export const _addPartner = (data: FormData, setAddPartnerData: React.Dispatch<React.SetStateAction<PARTNER_TYPE>>, setPreviewImg: React.Dispatch<React.SetStateAction<string | File>>) => async (dispatch: any) => {
    try {
        dispatch(_loadingPartner())

        const response = await axios.post(`${partner}/register`, data, { headers: { Authorization: `Bearer ${token}` } })

        toast.success('Le partenaire a été ajouté avec succès.')

        setAddPartnerData({ logo: '', name: '', description: '' })
        setPreviewImg('')

        dispatch({ type: ADD_PARTNER, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data)
        dispatch(_errorPartner(error?.response?.data))
    }
}

export const _editPartner = (id: string, data: FormData, setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch: any) => {
    try {
        dispatch(_loadingPartner())

        const response = await axios.put(`${partner}/${id}`, data, { headers: { Authorization: `Bearer ${token}` } })

        toast.success('Le partenaire a été modifié avec succès.')

        setSeeModalDisplayEditDelete(false)

        dispatch({ type: EDIT_PARTNER, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data)
        dispatch(_errorPartner(error?.response?.data))
    }
}

export const _deletePartner = (id: string, setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch: any) => {
    try {
        dispatch(_loadingPartner())

        const response = await axios.delete(`${partner}/${id}`, { headers: { Authorization: `Bearer ${token}` } })

        toast.success('Le partenaire a été supprimé avec succès.')

        setSeeModalDisplayEditDelete(false)

        dispatch({ type: DELETE_PARTNER, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data)
        dispatch(_errorPartner(error?.response?.data))
    }
}