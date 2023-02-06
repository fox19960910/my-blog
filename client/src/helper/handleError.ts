export const renderError = (errors: any, prop: string) => {
    if (errors[prop]) {
        // const errorName = prop.split("_").join(' ');
        const errorType = errors[prop].type

        switch (errorType) {
            case 'required': {
                return 'This field is required'
            }
            case 'previousPasswordMatch': {
                return 'Your password is not match'
            }
        }
    }

    return
}
