import config from "../config";

const initialState = {
    logged: false,
    userData: {},
    userDataLoading:false,
    resultInfo:''
}

const userData = (state = initialState, action) => {   
    switch (action.type) {
        case 'register':            
            return {...initialState,resultInfo:action.payload}
        case 'userDataLoading':
            return {
                ...state,
                userDataLoading:action.payload
            }
        case 'userDataUpdate':
            return state;
        case 'matchUpdate':
            return state;
        case 'login':
            if (action.payload.logged) {
                return action.payload
            } else {
                return {...initialState,...action.payload}
            }
        case 'setUserData':
            return action.payload;
        case 'isLogged': 
                if (action.payload.logged) {
                    return action.payload
                } else {
                    return initialState
                }
                case 'logOut':
                   
                    return initialState
                default:
                    return state;
    }
}

export default userData;