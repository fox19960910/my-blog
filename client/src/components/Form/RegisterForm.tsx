import styled from '@emotion/styled'
import GoogleIcon from '@mui/icons-material/Google'
import TwitterIcon from '@mui/icons-material/Twitter'
import {
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    Typography,
} from '@mui/material'
import Box from '@mui/material/Box'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import InputFiled from '../Base/InputFiled'
import Logo from '../Base/Logo'

const RegisterForm = () => {
    const context = useContext(AuthContext)
    const navigate = useNavigate()
    const form = useForm<IRegisterForm>({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    })
    const { handleSubmit, formState } = form
    const onSubmit = async (data: IRegisterForm) => {
        console.log(data)

        try {
            const res = await context?.registerUser(data)
            if (res) navigate('/login')
        } catch (error) {}
    }

    console.log(formState.errors)
    return (
        <Box minWidth={300}>
            <Logo />
            <Typography mt={2} variant="h3">
                Create an account
            </Typography>
            <Typography mt={2}>Let's get started with free</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Box mt={2}>
                    <Box>
                        <InputFiled
                            name="email"
                            form={form}
                            rules={{ required: true }}
                            placecholder="Email"
                        />
                    </Box>
                    <Box mt={2}>
                        <InputFiled
                            name="password"
                            type="password"
                            placecholder="Password"
                            form={form}
                            rules={{ required: true }}
                        />
                    </Box>
                    <Box mt={2}>
                        <InputFiled
                            name="confirmPassword"
                            type="password"
                            placecholder="Confirm your password"
                            form={form}
                            rules={{
                                required: true,
                                validate: {
                                    previousPasswordMatch: (
                                        confirmPassword
                                    ) => {
                                        const password =
                                            form.getValues('password')
                                        return confirmPassword === password
                                    },
                                },
                            }}
                        />
                    </Box>
                </Box>

                <Box mt={3}>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{ textTransform: 'unset' }}
                    >
                        Create account
                    </Button>
                </Box>
                <Box mt={1}>
                    <LogoButton
                        variant="outlined"
                        fullWidth
                        size="large"
                        startIcon={<GoogleIcon />}
                    >
                        Login with Google
                    </LogoButton>
                </Box>
                <Box mt={1}>
                    <LogoButton
                        variant="outlined"
                        fullWidth
                        size="large"
                        startIcon={<TwitterIcon />}
                    >
                        Login with Twitter
                    </LogoButton>
                </Box>

                <Box mt={3}>
                    <Typography>
                        Already have an account?
                        <ForgotPasswork to="/login"> Login</ForgotPasswork>
                    </Typography>
                </Box>
            </form>
        </Box>
    )
}

const LogoButton = styled(Button)`
    padding: 5px 10px;
    margin-top: 10px;
`
const ForgotPasswork = styled(Link)`
    color: #000;
    font-weight: bold;
`
export default RegisterForm
