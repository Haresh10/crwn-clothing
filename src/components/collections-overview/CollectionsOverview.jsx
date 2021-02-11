import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import "./collections-overview.scss";
import CollectionPreview from "../../components/collection-preview/CollectionPreview";
import { selectCollectionsArray } from "../../redux/shop/shop.selectors";

const CollectionsOverview = ({ collections, match }) => {
  return (
    <div className="shop-page">
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsArray,
});
export default connect(mapStateToProps)(CollectionsOverview);
