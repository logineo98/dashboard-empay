export const api = 'http://192.168.50.82:8000/api/v1'

export const admin = `${api}/admins`
export const customer = `${api}/customers`
export const api_img = 'http://192.168.50.82:9000'

// admin
export const LOADING_ADMIN = 'LOADING_ADMIN'
export const ERROR_ADMIN = 'ERROR_ADMIN'
export const IS_CONNECTED = 'IS_CONNECTED'
export const GET_ADMIN = 'GET_ADMIN'
export const GET_ALL_ADMINS = 'GET_ALL_ADMINS'
export const ADD_ADMIN = 'ADD_ADMIN'
export const EDIT_ADMIN = 'EDIT_ADMIN'
export const DELETE_ADMIN = 'DELETE_ADMIN'
export const GET_ADMIN_BY_USERNAME_OR_EMAIL_OR_PHONE = 'GET_ADMIN_BY_USERNAME_OR_EMAIL_OR_PHONE'
export const VERIFY_CODE = 'VERIFY_CODE'
export const RESET_PASSWORD = 'RESET_PASSWORD'
export const RESEND_CODE = 'RESEND_CODE'

// customer
export const LOADING_CUSTOMER = 'LOADING_CUSTOMER'
export const ERROR_CUSTOMER = 'ERROR_CUSTOMER'
export const GET_ALL_CUSTOMERS = 'GET_ALL_CUSTOMERS'
export const ACTIVATED_OR_UNACTIVATED_ACCOUNT_CUSTOMER = 'ACTIVATED_OR_UNACTIVATED_ACCOUNT_CUSTOMER'