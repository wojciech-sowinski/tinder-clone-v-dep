const initialState = {
    showModal: false,
    formType: ''
}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'showLoginForm':
            return {
                showModal: true,
                    formType: 'loginForm'
            };
        case 'showRegisterForm':
            return {
                showModal: true,
                    formType: 'registerForm'
            };
        case 'hideModal':
            return {
                showModal: false,
                    formType: ''
            };
        default:
            return state
    }
}

export default modalReducer;