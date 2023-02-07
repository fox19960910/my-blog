import { createContext, useReducer, useEffect } from 'react'
import { authReducer } from './reducers/authReducer'
import axiosInstance from '../helper/axios'
import { getStorage, removeStorage, setStorage } from '../helper/localStorage'
import { LC_TOKEN_NAME, returnError } from './constants'
import { useSnackbar } from 'notistack'
import { MESSAGE, messge_code } from '../contants/message'
import { postReducer } from './reducers/postReducer'

type Props = {
    children: React.ReactNode
}

type TPostsReturn = {
    data: Array<Ipost>
    success: boolean
}
export const PostContext = createContext<
    | {
          postLoading: boolean
          posts: Array<Ipost> | []
          getAllPost: () => Promise<TPostsReturn | undefined>
      }
    | undefined
>(undefined)

const PostContextProvider = ({ children }: Props) => {
    const { enqueueSnackbar } = useSnackbar()
    const [postState, dispatch] = useReducer(postReducer, {
        postLoading: true,
        posts: false,
    })

    // check Authenication

    const getAllPost = async () => {
        try {
            const response = await axiosInstance.get<{}, TPostsReturn>(
                '/api/posts'
            )
            if (response.success) {
                dispatch({
                    type: 'SET_ALL_POST',
                    payload: {
                        posts: response.data,
                    },
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

    const { postLoading, posts } = postState
    return (
        <PostContext.Provider
            value={{
                postLoading,
                posts,
                getAllPost,
            }}
        >
            {children}
        </PostContext.Provider>
    )
}
export default PostContextProvider
