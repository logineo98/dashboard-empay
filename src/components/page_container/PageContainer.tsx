import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ROOT_REDUCER_TYPE } from '../../redux/store'
import { isTokenExpired } from '../../utils/functions'
import { useNavigate } from 'react-router-dom'
import { _isAdminConnected } from '../../redux/actions/admin.action'

type COMPONENT_TYPE = {
    children: any
    title_page: string
}

const PageContainer: FC<COMPONENT_TYPE> = (props) => {
    const { title_page, children } = props

    const navigate = useNavigate()

    let { connected } = useSelector((state: ROOT_REDUCER_TYPE) => state.admin)
    const dispatch = useDispatch<any>()

    const [isConnected, setIsConnected] = useState(connected)

    useEffect(() => {
        document.title = title_page as string

        const expiration_date = localStorage.getItem('expiration_date')
        const token = localStorage.getItem('token')
        const admin = localStorage.getItem('admin')

        if (expiration_date && token && admin) {
            if (isTokenExpired(new Date().getTime(), parseInt(expiration_date, 10))) {
                setIsConnected(false)
                navigate('/')
            } else {
                setIsConnected(true)
            }
        } else {
            setIsConnected(false)
            navigate('/')
        }
    }, [title_page, navigate])

    useEffect(() => {
        dispatch(_isAdminConnected(isConnected))
    }, [isConnected, dispatch])

    return children
}

export default PageContainer