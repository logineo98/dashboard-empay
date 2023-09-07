import React from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { routeConnected, routeNotConnected } from '../../utils/routes'
import Layout from '../../components/page_container/Layout'
import { useSelector } from 'react-redux'
import { ROOT_REDUCER_TYPE } from '../../redux/store'

const RouterIndex = () => {
    let { connected } = useSelector((state: ROOT_REDUCER_TYPE) => state.admin)

    connected = true

    return (
        <Router>
            <Routes>
                {connected ?
                    <Route path='/*'
                        element={
                            <Layout>
                                <Routes>
                                    <>
                                        {routeConnected.map((route, i) => <Route key={i} path={route.path} element={<route.Element />} />)}
                                        <Route path='/*' element={<Navigate to='/' />} />
                                    </>
                                </Routes>
                            </Layout>
                        }
                    />
                    :
                    <>
                        {routeNotConnected.map((route, i) => <Route key={i} path={route.path} element={<route.Element />} />)}
                        <Route path='/*' element={<Navigate to='/' />} />
                    </>}
            </Routes>
        </Router>
    )
}

export default RouterIndex