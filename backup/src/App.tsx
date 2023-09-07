import React, { useEffect, useState } from 'react'
import RouterIndex from './pages/router'
import { useDispatch } from 'react-redux'
import { isTokenExpired } from './utils/functions'
import { _getAdmin, _isAdminConnected } from './redux/actions/admin.action'

const App = () => {

  const [isConnected, setIsConnected] = useState(false)

  const dispatch = useDispatch<any>()

  useEffect(() => {
    const expiration_date = localStorage.getItem('expiration_date')
    const token = localStorage.getItem('token')
    const admin = localStorage.getItem('admin')

    if (expiration_date && token && admin) {
      if (isTokenExpired(new Date().getTime(), parseInt(expiration_date, 10))) {
        setIsConnected(false)
      } else {
        setIsConnected(true)
      }
    } else {
      setIsConnected(false)
    }
  }, [])

  useEffect(() => {
    dispatch(_isAdminConnected(isConnected))
    dispatch(_getAdmin())
  }, [isConnected, dispatch])

  return (
    <RouterIndex />
  )
}

export default App