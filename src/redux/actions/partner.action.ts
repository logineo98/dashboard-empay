import axios from "axios"
import { ERROR_PARTNER, GET_ALL_PARTNERS, LOADING_PARTNER, partner } from "../constants"
import { toast } from "react-toastify"

const token = localStorage.getItem('token')

export const _loadingPartner = () => (dispatch: any) => {
    dispatch({ type: LOADING_PARTNER })
}

export const _errorPartner = (payload: any) => (dispatch: any) => {
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