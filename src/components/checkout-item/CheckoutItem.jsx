import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  removeItem,
  clearItemFromCart,
  addItem,
} from "../../redux/cart/cartAction";
import "./checkoutitem.scss";

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { id, name, quantity, imageUrl, price } = cartItem;
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div
          className="arrow"
          onClick={() => {
            removeItem(cartItem);
          }}
        >
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div
          className="arrow"
          onClick={() => {
            addItem(cartItem);
          }}
        >
          &#10095;
        </div>
      </span>
      <span className="price">${price}</span>
      <div className="remove-button" onClick={() => clearItem(id)}>
        &#10005;
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  clearItem: (id) => dispatch(clearItemFromCart(id)),
  addItem: (cartItem) => dispatch(addItem(cartItem)),
  removeItem: (cartItem) => dispatch(removeItem(cartItem)),
});
export default connect(null, mapDispatchToProps)(CheckoutItem);
