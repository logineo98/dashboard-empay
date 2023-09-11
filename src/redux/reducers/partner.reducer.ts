import { INITIAL_PARTNER_STATE_TYPE } from '../../utils/types'
import { ERROR_PARTNER, GET_ALL_PARTNERS, LOADING_PARTNER } from '../constants'

const initialState: INITIAL_PARTNER_STATE_TYPE = {
    partner: null,
    allPartners: [],
    loadingPartner: false,
    error: null
}

const partnerReducer = (state = initialState, action: { type: string, payload: any }) => {
    const { type, payload } = action

    switch (type) {
        case LOADING_PARTNER:
            return { ...state, loadingPartner: true }

        case ERROR_PARTNER:
            return { ...state, error: payload, loadingPartner: false }

        case GET_ALL_PARTNERS:
            return { ...state, allPartners: payload, loadingPartner: false, error: null }

        default:
            return state
    }
}

export default partnerReducer