import { combineReducers } from "redux";
import UserReducer from "./user/userReducer";

const RootReducer = combineReducers({
  user: UserReducer,
});
export default RootReducer;
