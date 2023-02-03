import { createContext, useReducer, useEffect } from 'react'
import { authReducer } from './reducers/authReducer'
import axiosInstance from '../helper/axios'
import { getStorage, removeStorage, setStorage } from '../helper/localStorage'
import { LC_TOKEN_NAME } from './containts'

type Props = {
    children: React.ReactNode
}
type LoginReturn = {
    success: boolean
    message: string
    access_token: string
}
type authReturn = {
    success: boolean
    message: string
    user: Iuser
}
export const AuthContext = createContext<
    | {
          authLoading: boolean
          isAuthenticated: boolean
          user: Iuser | null
          loginUser: (userForm: IloginForm) => Promise<void>
      }
    | undefined
>(undefined)

const AuthContextProvider = ({ children }: Props) => {
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
                        user: response.user,
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
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])

    const { authLoading, isAuthenticated, user } = authState
    return (
        <AuthContext.Provider
            value={{ loginUser, authLoading, isAuthenticated, user }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider
