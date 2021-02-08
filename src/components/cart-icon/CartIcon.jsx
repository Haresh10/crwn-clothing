import React from "react";
import { connect } from "react-redux";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";
import { toggleCartDropdown } from "../../redux/cart/cartAction";

const CartIcon = ({ toggleCartDropdown }) => {
  return (
    <div className="cart-icon" onClick={toggleCartDropdown}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};
const mapDispatchToProps = (dipatch) => ({
  toggleCartDropdown: () => dipatch(toggleCartDropdown()),
});
export default connect(null, mapDispatchToProps)(CartIcon);
