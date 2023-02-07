import { createContext, useReducer, useEffect } from 'react'
import { authReducer } from './reducers/authReducer'
import axiosInstance from '../helper/axios'
import { getStorage, removeStorage, setStorage } from '../helper/localStorage'
import { LC_TOKEN_NAME, returnError } from './constants'
import { useSnackbar } from 'notistack'
import { MESSAGE, messge_code } from '../contants/message'

type Props = {
    children: React.ReactNode
}
type LoginReturn = {
    success: boolean
    message: messge_code
    access_token: string
}
type authReturn = {
    success: boolean
    message: messge_code
    data: Iuser
}
export const AuthContext = createContext<
    | {
          authLoading: boolean
          isAuthenticated: boolean
          user: Iuser | null
          loginUser: (userForm: IloginForm) => Promise<LoginReturn | undefined>
          registerUser: (
              userForm: IRegisterForm
          ) => Promise<LoginReturn | undefined>
          logOut: () => void
      }
    | undefined
>(undefined)

const AuthContextProvider = ({ children }: Props) => {
    const { enqueueSnackbar } = useSnackbar()
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    })

    // check Authenication

    const checkAuth = async () => {
        try {
            const response = await axiosInstance.get<{}, authReturn>(
                '/api/auth'
            )
            if (response.success) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: true,
                        user: response.data,
                    },
                })
            }
        } catch (error) {
            removeStorage(LC_TOKEN_NAME)
            dispatch({
                type: 'SET_AUTH',
                payload: {
                    isAuthenticated: false,
                    user: null,
                },
            })
        }
    }

    // Login
    const loginUser = async (userForm: IloginForm) => {
        try {
            const response = await axiosInstance.post<{}, LoginReturn>(
                'api/auth/login',
                {
                    username: userForm.email,
                    password: userForm.password,
                }
            )
            if (response) {
                const { access_token } = response

                setStorage(LC_TOKEN_NAME, access_token)

                await checkAuth()
                return response
            }
        } catch (err) {
            const error = err as returnError
            const message = error.message
            enqueueSnackbar(MESSAGE?.[message] || MESSAGE.something_wrong, {
                variant: 'error',
            })
        }
    }

    // Register
    const registerUser = async (userForm: IRegisterForm) => {
        try {
            const response = await axiosInstance.post<{}, LoginReturn>(
                'api/auth/register',
                {
                    username: userForm.email,
                    password: userForm.password,
                }
            )
            if (response) {
                // const { access_token } = response

                // setStorage(LC_TOKEN_NAME, access_token)

                // await checkAuth()

                const message = response.message
                enqueueSnackbar(MESSAGE?.[message] || MESSAGE.something_wrong, {
                    variant: 'success',
                })
                return response
            }
        } catch (err) {
            const error = err as returnError
            const message = error.message
            enqueueSnackbar(MESSAGE?.[message] || MESSAGE.something_wrong, {
                variant: 'error',
            })
        }
    }

    //Logout
    const logOut = () => {
        removeStorage(LC_TOKEN_NAME)
        dispatch({
            type: 'SET_AUTH',
            payload: {
                isAuthenticated: false,
                user: null,
            },
        })
    }
    useEffect(() => {
        checkAuth()
    }, [])

    const { authLoading, isAuthenticated, user } = authState
    return (
        <AuthContext.Provider
            value={{
                loginUser,
                logOut,
                authLoading,
                isAuthenticated,
                user,
                registerUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider
