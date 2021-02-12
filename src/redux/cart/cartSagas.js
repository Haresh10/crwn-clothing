import { takeLatest, put, call, all } from "redux-saga/effects";
import userActionTypes from "../user/user.action.types";
import { clearCart } from "./cartAction";
function* clearCartOnSignOutSuccess() {
  yield put(clearCart());
}
function* onSignOutSuccess() {
  yield takeLatest(userActionTypes.SIGNOUT_SUCCESS, clearCartOnSignOutSuccess);
}
export function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}
