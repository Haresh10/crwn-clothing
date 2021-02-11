import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import CollectionPage from "../collection/CollectionPage";
import WithSpinner from "../../components/with-spinner/WithSpinner";
import CollectionsOverview from "../../components/collections-overview/CollectionsOverview";
import { updateShopCollections } from "../../redux/shop/shop.action";

import "./shoppage.scss";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.config";
import { connect } from "react-redux";

const ShopPage = ({ match, updateShopCollections }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const collectionsRef = firestore.collection("collections");
    const unsubscribeFromSnapshot = collectionsRef.onSnapshot(
      async (snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        updateShopCollections(collectionsMap);
        setIsLoading(false);
      }
    );

    return () => unsubscribeFromSnapshot();
  }, []);
  const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
  const CollectionPageWithSpinner = WithSpinner(CollectionPage);
  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        render={(props) => (
          <CollectionsOverviewWithSpinner isLoading={isLoading} {...props} />
        )}
      />
      <Route
        path={`${match.path}/:collectionId`}
        render={(props) => (
          <CollectionPageWithSpinner isLoading={isLoading} {...props} />
        )}
      />
    </div>
  );
};
const mapDipatchToProps = (dipatch) => ({
  updateShopCollections: (collectionsMap) =>
    dipatch(updateShopCollections(collectionsMap)),
});
export default connect(null, mapDipatchToProps)(ShopPage);
