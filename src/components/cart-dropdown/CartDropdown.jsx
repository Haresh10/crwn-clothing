import React from "react";
import "./cart-dropdown.styles.scss";
import CustomButton from "../custom-button/CustomButton";
import CartItem from "../cart-item/CartItem";
import { connect } from "react-redux";
import { SelectCartItems } from "../../redux/cart/cart.selectors";

const CartDropdown = ({ cartItems }) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
      <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
  );
};
const mapStateToProps = (state) => ({
  cartItems: SelectCartItems(state),
});
export default connect(mapStateToProps)(CartDropdown);
