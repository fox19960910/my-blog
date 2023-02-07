export const postReducer = (state: any, action: any) => {
    const { type, payload } = action
    const { posts } = payload
    switch (type) {
        case 'SET_ALL_POST':
            return {
                ...state,
                postLoading: false,
                posts,
            }
        default:
            return state
    }
}
