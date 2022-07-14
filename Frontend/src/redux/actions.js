import axios from "axios";

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_A_PRODUCT = "GET_A_PRODUCT";
export const GET_ALL_INFORMATION = "GET_ALL_INFORMATION";
export const ADD_CART = "ADD_CART";
export const CLEAR_CART = "CLEAR_CART";
export const REMOVE_ONE_FROM_CART = "REMOVE_ONE_FROM_CART";
export const SET_QUANTITY = "SET_QUANTITY";

export async function getAllProducts() {
    return async function (dispatch) {
      try {
        const products = await axios.get(`/api/products/`);
        return dispatch({
          type: GET_ALL_PRODUCTS,
          payload: products.data,
        });
      } catch (e) {
        console.error("Error: " + e.message);
      }
    };
}

export async function getAProduct(id) {
  return async function (dispatch) {
    try {
      const product = await axios.get(`/api/products/${id}`);
      return dispatch({
        type: GET_A_PRODUCT,
        payload: product.data,
      });
    } catch (e) {
      console.error("Error: " + e.message);
    }
  };
}

export async function getInformation() {
  return async function (dispatch) {
    try {
      const info = await axios.get(`/api/information/`);
      return dispatch({
        type: GET_ALL_INFORMATION,
        payload: info.data,
      });
    } catch (e) {
      console.error("Error: " + e.message);
    }
  };
}

export async function addCart(element) {
  return async function (dispatch) {
    return dispatch({
      type: ADD_CART,
      payload: element,
    });
  };
}

export async function removeOneFromCart(element) {
  return async function (dispatch) {
    return dispatch({
      type: REMOVE_ONE_FROM_CART,
      payload: element,
    });
  };
}

export async function clearCart() {
  return async function (dispatch) {
    return dispatch({
      type: CLEAR_CART,
      payload: [],
    });
  };
}

export async function setQuantity(quantity) {
  return async function (dispatch) {
    return dispatch({
      type: SET_QUANTITY,
      payload: quantity,
    });
  };
}