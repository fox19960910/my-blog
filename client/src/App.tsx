import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Authenication from './pages/Auth'
import AuthContextProvider from './contexts/AuthContext'
import DashBoard from './pages/Dashboard'
import PrivateRoute from './Router/PrivateRoute'
import { SnackbarProvider } from 'notistack'
const ScrollToTop = () => {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}
function App() {
    return (
        <SnackbarProvider
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            autoHideDuration={3000}
            maxSnack={5}
        >
            <AuthContextProvider>
                <BrowserRouter>
                    <ScrollToTop />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/" element={<PrivateRoute />}>
                            <Route path="dashboard" element={<DashBoard />} />
                        </Route>
                        <Route
                            path="/login"
                            element={<Authenication path="login" />}
                        />
                        <Route
                            path="/register"
                            element={<Authenication path="register" />}
                        />
                    </Routes>
                </BrowserRouter>
            </AuthContextProvider>
        </SnackbarProvider>
    )
}

export default App
