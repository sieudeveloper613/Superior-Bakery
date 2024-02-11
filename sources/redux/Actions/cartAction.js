import { HANDLING_CART_CACULATOR, HANDLING_CART_ITEM } from "../Types";

export const cartItemAction = (payload) => {
    return {
        type: HANDLING_CART_ITEM,
        payload
    }
}

export const cartCaculatorAction = (payload) => {
    return {
        type: HANDLING_CART_CACULATOR,
        payload,
    }
}