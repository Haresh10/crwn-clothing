import shopActionTypes from "./shop.types";
import { takeLatest, call, put, all } from "redux-saga/effects";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.config";
import { fetchCollectionsError, fetchCollectionsSuccess } from "./shop.action";

function* fetchCollectionsAsync() {
  try {
    const collectionsRef = yield firestore.collection("collections");
    const snapshot = yield collectionsRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsError(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    shopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
export function* shopSagas(){
  yield all([call(fetchCollectionsStart)])
}
