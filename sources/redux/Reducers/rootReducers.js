import { combineReducers } from 'redux'
import authState from './authReducer'
import cartState from './cartReducer'

export default combineReducers({
    authState,
    cartState,
})