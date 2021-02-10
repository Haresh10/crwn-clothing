import React from "react";
import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selectors";
import "./collectionpage.scss";
import CollectionItem from "../../components/collection-item/CollectionItem";

const CollectionPage = ({ collection: { title, items } }) => {
  return (
    <div className="collection-page">
      <h2 className="collection-title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});
export default connect(mapStateToProps)(CollectionPage);