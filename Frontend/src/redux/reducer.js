import {
    GET_ALL_PRODUCTS, 
    GET_A_PRODUCT, 
    GET_ALL_INFORMATION, 
    GET_ALL_FILTER_PRODUCTS,
    ADD_CART, 
    CLEAR_CART, 
    REMOVE_ONE_FROM_CART, 
    SET_QUANTITY, 
    SET_USER,
    GET_ALL_USERS,
    SET_USER_COPY,
    SET_EDIT_PRODUCT,
    CLEAR_PRODUCT,
    SET_TAGS,    
    GET_ALL_PURCHASES
} from "./actions";


const initialState = {
    products: [],
    product: [],
    promotions: [],
    estadistics: [],
    info: [],
    cart: [],
    user: [],
    allUsers: [],
    userCopy: [],
    allUsersCopy: [],
    editProduct: [],
    tags: [],
    disableProducts: [],
    filterProducts: [],
    allPurchases: []
}


export default function rootReducer(state = initialState, payload) {
    switch (payload.type) {
        case GET_ALL_PRODUCTS:
            return {
            ...state,
            products: payload.payload.onlyActive,
            disableProducts: payload.payload.onlyDisabled,
            }
        case GET_A_PRODUCT:
            return {
            ...state,
            product: payload.payload
            }
        case GET_ALL_PURCHASES:
            return {
            ...state,
            allPurchases: payload.payload
            }
        case GET_ALL_FILTER_PRODUCTS:
            return {
                ...state,
                filterProducts: payload.payload
            }

        case CLEAR_PRODUCT:
            return {
                ...state,
                product: []
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
        case GET_ALL_USERS:
            return {
                ...state,
                allUsers: payload.payload,
                allUsersCopy: payload.payload
            }
        case SET_USER:
            return {
                ...state,
                user: payload.payload
            }
        case SET_USER_COPY:
            return {
                ...state,
                userCopy: payload.payload,
                allUsersCopy: state.allUsers
            }
        case SET_EDIT_PRODUCT:
            return {
                ...state,
                editProduct: payload.payload,
            }
        case SET_TAGS:
            return {
                ...state,
                tags: payload.payload
            }
        default:
        return { ...state };
    }
}