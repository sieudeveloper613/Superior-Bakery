import { HANDLING_CART_CACULATOR, HANDLING_CART_ITEM } from "../Types";

const initState = {
    cartItem: null,
    caculator: 0,
}

const cartReducer = (state = initState, { type, payload }) => {
    switch(type) {
        case HANDLING_CART_ITEM: 
            return {
                ...state,
                cartItem: payload
            }
        case HANDLING_CART_CACULATOR:
            return {
                ...state,
                caculator: payload,
            }
        default:
            return state;
    }
}

export default cartReducer;