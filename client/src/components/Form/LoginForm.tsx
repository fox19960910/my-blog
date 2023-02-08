import styled from '@emotion/styled'
import GoogleIcon from '@mui/icons-material/Google'
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
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import InputFiled from '../Base/InputFiled'
import Logo from '../Base/Logo'

const LoginForm = () => {
    const context = useContext(AuthContext)

    const form = useForm<IloginForm>({
        defaultValues: {
            email: '',
            password: '',
        },
    })
    const { handleSubmit, formState } = form
    const onSubmit = async (data: IloginForm) => {
        try {
            await context?.loginUser(data)
        } catch (error) {}
    }

    const handleCheckRemember = () => console.log('remember')

    console.log(formState.errors)
    return (
        <Box minWidth={300}>
            <Logo />
            <Typography mt={2} variant="h3">
                Welcome to Admin.
            </Typography>
            <Typography mt={2}>
                Continue with Google or enter your details.
            </Typography>
            <GoogleButton variant="outlined" startIcon={<GoogleIcon />}>
                Login with Google
            </GoogleButton>
            <Divider light sx={{ marginTop: '10px' }}>
                or
            </Divider>
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
                            form={form}
                            rules={{ required: true }}
                            placecholder="Password"
                        />
                    </Box>
                </Box>
                <Box
                    mt={1}
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
                    alignItems={'center'}
                >
                    <FormControlLabel
                        control={<Checkbox onClick={handleCheckRemember} />}
                        label="Remember for 30 days"
                    />
                    <Typography>
                        <ForgotPasswork to="/forgot-password">
                            Forgot password
                        </ForgotPasswork>
                    </Typography>
                </Box>

                <Box mt={3}>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{ textTransform: 'unset' }}
                    >
                        Log in
                    </Button>
                </Box>

                <Box mt={3}>
                    <Typography>
                        Don't have an account?
                        <ForgotPasswork to="/register">
                            {' '}
                            Sign up for free
                        </ForgotPasswork>
                    </Typography>
                </Box>
            </form>
        </Box>
    )
}

const GoogleButton = styled(Button)`
    padding: 5px 10px;
    margin-top: 10px;
`
const ForgotPasswork = styled(Link)`
    color: #000;
    font-weight: bold;
`
export default LoginForm
