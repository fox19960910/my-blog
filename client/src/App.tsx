import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Authenication from './pages/Auth'
import AuthContextProvider from './contexts/AuthContext'
import DashBoard from './pages/Dashboard'
import PrivateRoute from './Router/PrivateRoute'
import { SnackbarProvider } from 'notistack'
import PostContextProvider from './contexts/PostContext'
import BlogDetail from './pages/Blog/BlogDetail'
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
                <PostContextProvider>
                    <BrowserRouter>
                        <ScrollToTop />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/" element={<PrivateRoute />}>
                                <Route
                                    path="dashboard"
                                    element={<DashBoard />}
                                />
                                <Route
                                    path="post/:id"
                                    element={<BlogDetail />}
                                />
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
                </PostContextProvider>
            </AuthContextProvider>
        </SnackbarProvider>
    )
}

export default App
