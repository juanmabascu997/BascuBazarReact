import {GET_ALL_PRODUCTS, GET_A_PRODUCT, GET_ALL_INFORMATION, ADD_CART, CLEAR_CART, REMOVE_ONE_FROM_CART, SET_QUANTITY} from "./actions";


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
            cart: payload.payload.map(element => {
                if(element.hasOwnProperty('quantity')){
                    return{...element}
                } else{
                    return {
                        ...element,
                        quantity: 1
                    }
                }
                })
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
        case SET_QUANTITY:
            return {
            ...state,
            cart: state.cart.map(element => {
                if (element.name === payload.payload.name) {
                    return {
                        ...element,
                        quantity: parseInt(payload.payload.quantity) 
                    }
                } else {
                    return element
                }
            })
            }
        default:
        return { ...state };
    }
}