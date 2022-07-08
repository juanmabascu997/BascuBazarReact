import {GET_ALL_PRODUCTS, GET_A_PRODUCT, GET_ALL_INFORMATION, ADD_CART, CLEAR_CART, REMOVE_ONE_FROM_CART} from "./actions";


const initialState = {
    products: [],
    product: [],
    info: [],
    cart: []
}


export default function rootReducer(state = initialState, payload) {
    switch (payload.type) {
        case GET_ALL_PRODUCTS:
            return {
            ...state,
            products: payload.payload
            }
        case GET_A_PRODUCT:
            return {
            ...state,
            product: payload.payload
            }
        case GET_ALL_INFORMATION:
            return {
            ...state,
            info: payload.payload
            }
        case ADD_CART:
            return {
            ...state,
            cart: payload.payload
            }
        case REMOVE_ONE_FROM_CART:
            return {
            ...state,
            cart: state.cart.filter(item => item.name !== payload.payload) 
            }
        case CLEAR_CART:
            return {
            ...state,
            cart: payload.payload
            }
        default:
        return { ...state };
    }
}