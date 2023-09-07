export type ADMIN_TYPE = {
    id?: string
    username: string
    name: string
    email: string
    role?: string
    password?: string
    createdAt?: Date
    updatedAt?: Date
}

export type INITIAL_ADMIN_STATE_TYPE = {
    connected: boolean
    admin: null | ADMIN_TYPE
    allAdmins: Array<ADMIN_TYPE>
    loadingAdmin: boolean
    error: any
}

export type COLUMN_DATA_TABLE_TYPE = {
    id: string
    name: string
    email: string
    username: string
    role: string
    createdAt?: Date
    updatedAt?: Date
}

export type PAGE_COMPONENT_TYPE = (props: {
    title?: string
    title_page?: string
    light?: boolean
    children?: JSX.Element

    setLight?: React.Dispatch<React.SetStateAction<boolean>>
}) => JSX.Element