import React, { useState } from "react";
import "./shoppage.scss";
import SHOP_DATA from "./shop-data";
import CollectionPreview from "../../components/collection-preview/CollectionPreview";

const ShopPage = () => {
  const [collections, setCollections] = useState(SHOP_DATA);
  return (
    <div className="shoop-page">
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

export default ShopPage;
