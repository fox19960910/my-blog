import { useSnackbar } from 'notistack'
import { createContext, useReducer } from 'react'
import { MESSAGE, messge_code } from '../contants/message'
import axiosInstance from '../helper/axios'
import { returnError } from './constants'
import { postReducer } from './reducers/postReducer'

type Props = {
    children: React.ReactNode
}

type TPostsReturn = {
    data: Array<Ipost>
    message: messge_code
    success: boolean
}

type TDetailPostReturn = {
    data: Ipost
    message: messge_code
    success: boolean
}

type TbodyPost = {
    title: string
    description: string
    category: 'accessory' | 'travel' | 'food'
    body: string | undefined
}
export const PostContext = createContext<
    | {
          postLoading: boolean
          posts: Array<Ipost> | []
          myposts: Array<Ipost> | []
          postDetail: Ipost
          getAllPost: () => Promise<TPostsReturn | undefined>
          getMyPost: () => Promise<TPostsReturn | undefined>
          getDetailPost: (id: string) => Promise<Ipost | undefined>
          createPost: (post: TbodyPost) => Promise<TPostsReturn | undefined>
          updatePost: (
              id: string,
              post: TbodyPost
          ) => Promise<Ipost | undefined>
      }
    | undefined
>(undefined)

const PostContextProvider = ({ children }: Props) => {
    const { enqueueSnackbar } = useSnackbar()
    const [postState, dispatch] = useReducer(postReducer, {
        postLoading: true,
        posts: null,
        postDetail: null,
        myposts: null,
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

    const getMyPost = async () => {
        try {
            const response = await axiosInstance.get<{}, TPostsReturn>(
                '/api/posts/my-post'
            )
            if (response.success) {
                dispatch({
                    type: 'SET_MY_POST',
                    payload: {
                        myposts: response.data,
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
            const response = await axiosInstance.get<{}, TDetailPostReturn>(
                `/api/posts/detail/${id}`
            )
            if (response.success) {
                dispatch({
                    type: 'SET_DETAIL_POST',
                    payload: {
                        postDetail: response.data,
                    },
                })
                return response.data
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
    // update  a blog

    const updatePost = async (id: string, post: TbodyPost) => {
        try {
            const response = await axiosInstance.put<{}, TDetailPostReturn>(
                `/api/posts/${id}`,
                post
            )
            if (response.success) {
                return response.data
            }
        } catch (err) {
            const error = err as returnError
            const message = error.message
            enqueueSnackbar(MESSAGE?.[message] || MESSAGE.something_wrong, {
                variant: 'error',
            })
        }
    }

    const { postLoading, posts, postDetail, myposts } = postState
    return (
        <PostContext.Provider
            value={{
                postLoading,
                posts,
                myposts,
                postDetail,
                getAllPost,
                createPost,
                getDetailPost,
                getMyPost,
                updatePost,
            }}
        >
            {children}
        </PostContext.Provider>
    )
}
export default PostContextProvider
