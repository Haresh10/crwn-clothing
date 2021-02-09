import { findAllByTitle } from "@testing-library/react";
import React from "react";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cartAction";
import "./collectionitem.scss";
import CustomButton from "../custom-button/CustomButton";

const CollectionItem = ({ item, addItem }) => {
  const { name, imageUrl, price } = item;
  return (
    <div className="collection-item">
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="collection-footer">
        <span className="title">{name}</span>
        <span className="price">${price}</span>
      </div>
      <CustomButton inverted onClick={() => addItem(item)}>
        Add To Cart
      </CustomButton>
    </div>
  );
};
const mapDispatchToProps = (dipatch) => ({
  addItem: (item) => dipatch(addItem(item)),
});
export default connect(null, mapDispatchToProps)(CollectionItem);
