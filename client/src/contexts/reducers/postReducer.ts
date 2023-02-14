export const postReducer = (state: any, action: any) => {
    const { type, payload } = action
    const { posts, postDetail, myposts } = payload
    switch (type) {
        case 'SET_ALL_POST':
            return {
                ...state,
                postLoading: false,
                posts,
            }
        case 'SET_MY_POST':
            return {
                ...state,
                postLoading: false,
                myposts,
            }
        case 'SET_DETAIL_POST':
            return {
                ...state,
                postLoading: false,
                postDetail,
            }
        default:
            return state
    }
}
