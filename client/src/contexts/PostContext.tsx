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
    message: messge_code
    success: boolean
}

type TbodyPost = {
    title: string
    description: string
    category: 'accessory' | 'travel' | 'food'
    body: string
}
export const PostContext = createContext<
    | {
          postLoading: boolean
          posts: Array<Ipost> | []
          postDetail: Ipost
          getAllPost: () => Promise<TPostsReturn | undefined>
          getDetailPost: (id: string) => Promise<TPostsReturn | undefined>
          createPost: (post: TbodyPost) => Promise<TPostsReturn | undefined>
      }
    | undefined
>(undefined)

const PostContextProvider = ({ children }: Props) => {
    const { enqueueSnackbar } = useSnackbar()
    const [postState, dispatch] = useReducer(postReducer, {
        postLoading: true,
        posts: null,
        postDetail: null,
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

    const getDetailPost = async (id: string) => {
        try {
            const response = await axiosInstance.get<{}, TPostsReturn>(
                `/api/posts/${id}`
            )
            if (response.success) {
                dispatch({
                    type: 'SET_DETAIL_POST',
                    payload: {
                        postDetail: response.data,
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

    // Post a blog

    const createPost = async (post: TbodyPost) => {
        try {
            const response = await axiosInstance.post<TbodyPost, TPostsReturn>(
                'api/posts',
                post
            )
            if (response.success) {
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

    const { postLoading, posts, postDetail } = postState
    return (
        <PostContext.Provider
            value={{
                postLoading,
                posts,
                postDetail,
                getAllPost,
                createPost,
                getDetailPost,
            }}
        >
            {children}
        </PostContext.Provider>
    )
}
export default PostContextProvider
