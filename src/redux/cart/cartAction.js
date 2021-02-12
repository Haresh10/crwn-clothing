import { CartActionTypes } from "./cart.action.types";
export const toggleCartDropdown = () => ({
  type: CartActionTypes.TOGGLE_CART_DROPDOWN,
});
export const addItem = (cartItem) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: cartItem,
});
export const clearItemFromCart = (id) => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: id,
});
export const removeItem = (item) => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item,
});
export const clearCart = () => ({
  type: CartActionTypes.CLEAR_CART,
});
