import { combineReducers } from "redux";
import cartReducer from "./cart/cartReducer";
import userReducer from "./user/userReducer";

const RootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});
export default RootReducer;
