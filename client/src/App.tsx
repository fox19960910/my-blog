import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Authenication from './pages/Auth'
import AuthContextProvider from './contexts/AuthContext'
import DashBoard from './pages/Dashboard'
import PrivateRoute from './Router/privateRoute'
const ScrollToTop = () => {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}
function App() {
    return (
        <AuthContextProvider>
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/login"
                        element={<Authenication path="login" />}
                    />
                    <Route
                        path="/register"
                        element={<Authenication path="register" />}
                    />
                    <PrivateRoute path="/dashboard" element={<DashBoard />} />
                </Routes>
            </BrowserRouter>
        </AuthContextProvider>
    )
}

export default App
