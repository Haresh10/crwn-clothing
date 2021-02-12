import { takeLatest, put, call, all } from "redux-saga/effects";
import userActionTypes from "./user.action.types";
import {
  auth,
  googleProvider,
  createUserOnFirebase,
  getCurrentUser,
} from "../../firebase/firebase.config";
import {
  signInError,
  emailSignInStart,
  signInSuccess,
  signOutError,
  signOutSucess,
  signUpError,
  signUpSuccess,
} from "./userAction";

function* getSnapshotFromUserAuth(userAuth) {
  try {
    const userRef = yield call(createUserOnFirebase, userAuth);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(call(signInError, error));
  }
}

function* signInwithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(call(signInError, error));
  }
}
function* signInWithEmailAndPassword({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(call(signInError, error));
  }
}
export function* onGoogleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGNIN_START, signInwithGoogle);
}
export function* onEmailSignInStart() {
  yield takeLatest(
    userActionTypes.EMAIL_SIGNIN_START,
    signInWithEmailAndPassword
  );
}
function* onUserStateChanged() {
  const userAuth = yield call(getCurrentUser);
  try {
    if (userAuth) {
      yield call(getSnapshotFromUserAuth, userAuth);
    }
  } catch (error) {
    put(call(signInError, error.message));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, onUserStateChanged);
}
function* signOutCurrentUser() {
  try {
    yield auth.signOut();
    yield put(signOutSucess());
  } catch (error) {
    yield put(call(signOutError, error.message));
  }
}
export function* onSignOutStart() {
  yield takeLatest(userActionTypes.SIGNOUT_START, signOutCurrentUser);
}
function* signUpAndLoginNewUser({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield createUserOnFirebase({ ...user, displayName });
    yield put(signUpSuccess());
    yield put(signInSuccess({ email, password }));
  } catch (error) {
    yield put(signUpError(error.message));
  }
}
function* onSignUpStart() {
  yield takeLatest(userActionTypes.SIGN_UP_START, signUpAndLoginNewUser);
}
export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
  ]);
}
