import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";
import { toggleCartDropdown } from "../../redux/cart/cartAction";
import { SelectCartItemsCount } from "../../redux/cart/cart.selectors";

const CartIcon = ({ toggleCartDropdown, itemCount }) => {
  return (
    <div className="cart-icon" onClick={toggleCartDropdown}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  itemCount: SelectCartItemsCount,
});
const mapDispatchToProps = (dipatch) => ({
  toggleCartDropdown: () => dipatch(toggleCartDropdown()),
});
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
