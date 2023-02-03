import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import styled from '@emotion/styled'
import LoginForm from '../../components/Form/LoginForm'
import RegisterForm from '../../components/Form/RegisterForm'
import { AuthContext } from '../../contexts/AuthContext'
import Loading from '../../components/Base/Loading'
import { useNavigate } from 'react-router-dom'
type Props = {
    path: string
}
function Authenication({ path }: Props) {
    const navigate = useNavigate()
    const context = useContext(AuthContext)

    if (context?.authLoading) {
        return <Loading />
    }
    if (context?.isAuthenticated) {
        navigate('/dashboard')
    }
    return (
        <Box display="flex" height="100vh" width="100%">
            <Box
                flex="1 1 40%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100%"
            >
                {path === 'login' && <LoginForm />}
                {path === 'register' && <RegisterForm />}
            </Box>
            <RightBg flex="1 1 60%"></RightBg>
        </Box>
    )
}

const RightBg = styled(Box)`
    background-color: #0093e9;
    background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
    border-top-left-radius: 110px;
`
export default Authenication
