export enum messge_code {
    missing_user_password = 'missing_user_password',
    user_not_found = 'user_not_found',
    user_already_taken = 'user_already_taken',
    user_crete_succefully = 'user_crete_succefully',
    incorrect_user_password = 'incorrect_user_password',
    something_wrong = 'something_wrong',
}
export const MESSAGE = {
    [messge_code.missing_user_password]: 'Email and Password is required',
    [messge_code.user_not_found]: 'User not found',
    [messge_code.user_already_taken]: 'Email have already used',
    [messge_code.user_crete_succefully]: 'Create successfuly',
    [messge_code.incorrect_user_password]:
        'Your email or password is incorrect',
    [messge_code.something_wrong]: 'Something went wrong!!!',
}
