import shopActionTypes from "./shop.types";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.config";
export const fetchCollectionsStart = () => ({
  type: shopActionTypes.FETCH_COLLECTIONS_START,
});
export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});
export const fetchCollectionsError = (errorMessage) => ({
  type: shopActionTypes.FETCH_COLLECTIONS_ERROR,
  payload: errorMessage,
});
// code if we use thunk
export const fetchCollectionsMapAsync = () => {
  return async (dispatch) => {
    try {
      const collectionsRef = await firestore.collection("collections");
      dispatch(fetchCollectionsStart());
      const snapshot = await collectionsRef.get();
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      dispatch(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
      dispatch(fetchCollectionsError(error.message));
    }
  };
};
