import shopActionTypes from "./shop.types";
export const updateShopCollections = (collections) => ({
  type: shopActionTypes.UPDATE_COLLECTIONS,
  payload: collections,
});
