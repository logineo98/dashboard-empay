import { INITIAL_ADMIN_STATE_TYPE } from '../../utils/types'
import { ADD_ADMIN, DELETE_ADMIN, EDIT_ADMIN, ERROR_ADMIN, GET_ADMIN, GET_ADMIN_BY_USERNAME_OR_EMAIL_OR_PHONE, GET_ALL_ADMINS, IS_CONNECTED, LOADING_ADMIN, RESEND_CODE, RESET_PASSWORD, VERIFY_CODE } from '../constants'

const initialState: INITIAL_ADMIN_STATE_TYPE = {
    forgetAdminInfo: null,
    verifyCode: null,
    isPasswordModify: false,
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

        case EDIT_ADMIN:
            return {
                ...state,
                admin: payload.admin_connected,
                allAdmins: state.allAdmins.map(admin => {
                    if (admin.id === payload.data.id) {
                        return payload.data
                    } else return admin
                }),
                loadingAdmin: false, error: null
            }

        case DELETE_ADMIN:
            return {
                ...state,
                allAdmins: state.allAdmins.filter(admin => admin.id !== payload.id),
                loadingAdmin: false, error: null
            }

        case GET_ADMIN_BY_USERNAME_OR_EMAIL_OR_PHONE:
            return { ...state, forgetAdminInfo: payload, loadingAdmin: false, error: null }

        case RESEND_CODE:
            return { ...state, forgetAdminInfo: payload, loadingAdmin: false, error: null }

        case VERIFY_CODE:
            return { ...state, verifyCode: payload, loadingAdmin: false, error: null }

        case RESET_PASSWORD:
            return { ...state, isPasswordModify: payload.isPasswordModify, loadingAdmin: false, error: null }

        default:
            return state
    }
}

export default adminReducer