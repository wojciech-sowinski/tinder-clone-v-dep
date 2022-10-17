import { fetchMessages } from "../actions/messagesActions"

const initialState = 0

const newMessages = (state = initialState, action) => {


    switch (action.type) {
        case 'fetchNewMessageCount':

           
            return action.payload
        case 'resetNewMessageCounter':
            return initialState
        default:
            return state
    }
}

export default newMessages;