import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Base/Loading'
import LoginForm from '../../components/Form/LoginForm'
import RegisterForm from '../../components/Form/RegisterForm'
import { AuthContext } from '../../contexts/AuthContext'
type Props = {
    path: string
}
function Authenication({ path }: Props) {
    const navigate = useNavigate()
    const context = useContext(AuthContext)

    if (context?.authLoading) {
        return <Loading />
    }
    if (context?.isAuthenticated && path === 'login') {
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
                flexWrap="wrap"
            >
                {path === 'login' && <LoginForm />}
                {path === 'register' && <RegisterForm />}
            </Box>
            <RightBg flex="1 1 60%"></RightBg>
        </Box>
    )
}

const RightBg = styled(Box)`
    background-color: #ffb077;
    background-image: linear-gradient(160deg, #ffb077 0%, #be3455 100%);
    border-top-left-radius: 110px;
`
export default Authenication
