import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Route, RouteProps, useNavigate } from 'react-router-dom'
import Loading from '../components/Base/Loading'

export default function PrivateRoute(props: RouteProps) {
    const navigate = useNavigate()
    const context = useContext(AuthContext)

    if (context?.authLoading) {
        return <Loading />
    }
    if (!context?.isAuthenticated) {
        navigate('/login')
    }
    return <Route {...props} />
}
