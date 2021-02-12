import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import HomePage from "./pages/homepage/HomePage";
import ShopPage from "./pages/shop/ShopPage";
import Header from "./components/header/Header";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/SignInAndSignUp";
import { connect } from "react-redux";
import { SelectCurrentUser } from "./redux/user/user.selectors";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import { checkUserSession } from "./redux/user/userAction";

function App(props) {
  const { currentUser } = props;
  useEffect(() => {
    const { checkUserSession } = props;
    checkUserSession();
  }, []);
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route
          exact
          path="/login"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
          }
        />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/contact" component={""} />
      </Switch>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  currentUser: SelectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
