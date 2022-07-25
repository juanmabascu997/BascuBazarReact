import axios from "axios";

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_A_PRODUCT = "GET_A_PRODUCT";
export const GET_ALL_INFORMATION = "GET_ALL_INFORMATION";
export const ADD_CART = "ADD_CART";
export const CLEAR_CART = "CLEAR_CART";
export const REMOVE_ONE_FROM_CART = "REMOVE_ONE_FROM_CART";
export const SET_QUANTITY = "SET_QUANTITY";
export const SET_USER = "SET_USER";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const SET_USER_COPY = "SET_USER_COPY";
export const SET_EDIT_PRODUCT = "SET_EDIT_PRODUCT";

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

export async function setNewProduct(data) {
  let newProduct = await axios.post(`/api/products/`, data);
  return newProduct;
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

export async function getUsers() {
  return async function (dispatch) {
    let allUsers = await axios.get("/api/users/");
    return dispatch({
      type: GET_ALL_USERS,
      payload: allUsers.data,
    });
  };
}

export async function setUser(user) {
  let userToCreate = {
    name: user.name,
    email: user.email,
    image: user.picture,
    address: (user.address || "Not set yet"),
    phone: (user.phone || "Add your phone number"),
  }
  return async function (dispatch) {
    let newUser = await axios.post("/api/users/", userToCreate);
    return dispatch({
      type: SET_USER,
      payload: newUser.data,
    });
  };
}

export async function updateUser(id, data) {
    let allUsers = await axios.put(`/api/users/${id}`, data);
    return allUsers;
}

export async function updateProducts(id, data) {
  let userUpdate = await axios.put(`/api/products/products/${id}`, data);
  console.log(userUpdate);
  return userUpdate;
}

export async function setUserCopy(user) {
  return async function (dispatch) {
    return dispatch({
      type: SET_USER_COPY,
      payload: user,
    });
  };
}

export async function setEditProduct(product) {
  return async function (dispatch) {
    return dispatch({
      type: SET_EDIT_PRODUCT,
      payload: product,
    });
  };
}
