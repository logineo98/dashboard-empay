/***************************************************************
 * FORGET DISPLAY OPTIONS
***************************************************************/
export type FORGET_DISPLAY_OPTIONS = {
    search_email_or_username_or_phone: boolean
    write_code_send: boolean
    write_new_password: boolean
    succes_modify_password: boolean
}

/***************************************************************
 * ADMIN
***************************************************************/
export type ADMIN_TYPE = {
    id?: string
    username: string
    name: string
    email: string
    password?: string
}

export type INITIAL_ADMIN_STATE_TYPE = {
    forgetAdminInfo: null | { id: string, success: boolean }
    verifyCode: null | { id: string, success: boolean }
    connected: boolean
    isPasswordModify: boolean
    admin: null | ADMIN_TYPE
    allAdmins: Array<ADMIN_TYPE>
    loadingAdmin: boolean
    error: any
}

/***************************************************************
 * CUSTOMER
***************************************************************/
export type CUSTOMER_TYPE = {
    id?: string
    phone: string
    name: string
    firstname: string
    birthday: Date
    address: string
    email: string
    accountUBA: string
    document: string
    photo: string
    status: boolean
    signature: string
}

export type INITIAL_CUSTOMER_STATE_TYPE = {
    customer: null | CUSTOMER_TYPE
    allCustomers: Array<CUSTOMER_TYPE>
    loadingCustomer: boolean
    error: any
}

/***************************************************************
 * PARTNER
***************************************************************/
export type PARTNER_TYPE = {
    id?: string
    name: string
    description: string
    logo: string | File
}

export type INITIAL_PARTNER_STATE_TYPE = {
    partner: null | CUSTOMER_TYPE
    allPartners: Array<PARTNER_TYPE>
    loadingPartner: boolean
    error: any
}

/***************************************************************
 * COLUMN DATA TABLE
***************************************************************/
export type COLUMN_DATA_TABLE_TYPE = {
    id: string
    name: string
    email: string
    username: string
    role: string
    phone: string
    firstname: string
    birthday: Date
    address: string
    accountUBA: string
    document: string
    photo: string
    status: boolean
    signature: string
    description: string
    logo: string | File
    createdAt: Date
    updatedAt: Date
}

export type PAGE_COMPONENT_TYPE = (props: {
    title?: string
    title_page?: string
    light?: boolean
    children?: JSX.Element

    setLight?: React.Dispatch<React.SetStateAction<boolean>>
}) => JSX.Element