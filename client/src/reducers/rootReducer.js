import {
    combineReducers
} from 'redux'
import modalReducer from './modalReducer'
import userData from './userData'
import messages from './messages'
import users from './users'
import newMessages from './newMessages'
import dataLoaderReducer from './dataLoaderReducer'

const rootReducer = combineReducers({
    modalReducer,
    userData,
    messages,
    users,
    newMessages,
    dataLoaderReducer
})

export default rootReducer