import { INITIAL_ADMIN_STATE_TYPE } from '../../utils/types'
import { ADD_ADMIN, ERROR_ADMIN, GET_ADMIN, GET_ALL_ADMINS, IS_CONNECTED, LOADING_ADMIN } from '../constants';

const initialState: INITIAL_ADMIN_STATE_TYPE = {
    connected: false,
    admin: null,
    allAdmins: [],
    loadingAdmin: false,
    error: null
}

const adminReducer = (state = initialState, action: { type: string, payload: any }) => {
    const { type, payload } = action

    switch (type) {
        case LOADING_ADMIN:
            return { ...state, loadingAdmin: true }

        case ERROR_ADMIN:
            return { ...state, error: payload, loadingAdmin: false }

        case IS_CONNECTED:
            return { ...state, connected: payload, loadingAdmin: false, error: null }

        case GET_ADMIN:
            return { ...state, admin: payload, loadingAdmin: false, error: null }

        case GET_ALL_ADMINS:
            return { ...state, allAdmins: payload, loadingAdmin: false, error: null }

        case ADD_ADMIN:
            return { ...state, allAdmins: [payload, ...state.allAdmins], loadingAdmin: false, error: null }


        default:
            return state
    }
}

export default adminReducer