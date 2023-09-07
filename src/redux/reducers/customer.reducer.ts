import { INITIAL_CUSTOMER_STATE_TYPE } from '../../utils/types'
import { ACTIVATED_OR_UNACTIVATED_ACCOUNT_CUSTOMER, ERROR_CUSTOMER, GET_ALL_CUSTOMERS, LOADING_CUSTOMER } from '../constants'

const initialState: INITIAL_CUSTOMER_STATE_TYPE = {
    customer: null,
    allCustomers: [],
    loadingCustomer: false,
    error: null
}

const customerReducer = (state = initialState, action: { type: string, payload: any }) => {
    const { type, payload } = action

    switch (type) {
        case LOADING_CUSTOMER:
            return { ...state, loadingCustomer: true }

        case ERROR_CUSTOMER:
            return { ...state, error: payload, loadingCustomer: false }

        case GET_ALL_CUSTOMERS:
            return { ...state, allCustomers: payload, loadingCustomer: false, error: null }

        case ACTIVATED_OR_UNACTIVATED_ACCOUNT_CUSTOMER:
            return {
                ...state,
                allCustomers: state.allCustomers.map(customer => {
                    if (customer.id === payload.id) {
                        return payload
                    } else return customer
                }),
                loadingCustomer: false, error: null
            }

        default:
            return state
    }
}

export default customerReducer