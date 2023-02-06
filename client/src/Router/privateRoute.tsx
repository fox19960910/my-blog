import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Loading from '../components/Base/Loading'
import { AuthContext } from '../contexts/AuthContext'

export default function PrivateRoute() {
    const context = useContext(AuthContext)

    if (context?.authLoading) {
        return <Loading />
    }
    return !context?.isAuthenticated ? <Navigate to="/login" /> : <Outlet />
}
