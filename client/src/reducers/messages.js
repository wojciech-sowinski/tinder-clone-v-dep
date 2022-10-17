const initialState ={
    loading: false,
    messages: []
}

const messages = (state = initialState, action) => {
    switch (action.type) {
        case 'fetchMessages':
           
            return {...state,...action.payload};
        case 'sendMessage':         
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
            case 'msgDisplayed':
                return state;
            default:
                return state;
    }
}

export default messages;