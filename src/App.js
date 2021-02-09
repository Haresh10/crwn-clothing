import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";

import HomePage from "./pages/homepage/HomePage";
import ShopPage from "./pages/shop/ShopPage";
import Header from "./components/header/Header";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/SignInAndSignUp";
import { auth, createUserOnFirebase } from "./firebase/firebase.config";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/userAction";
import { SelectCurrentUser } from "./redux/user/user.selectors";

function App(props) {
  const { setCurrentUser, currentUser } = props;
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserOnFirebase(userAuth);
        userRef.onSnapshot((snapshot) =>
          setCurrentUser({ id: snapshot.id, ...snapshot.data() })
        );
      }
      setCurrentUser(userAuth);
    });
    return () => unsubscribeFromAuth();
  }, []);
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
        <Route
          exact
          path="/login"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
          }
        />
        <Route path="/contact" component={""} />
      </Switch>
    </div>
  );
}
const mapStateToProps = (state) => ({
  currentUser: SelectCurrentUser(state),
});
const mapDistpatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDistpatchToProps)(App);
