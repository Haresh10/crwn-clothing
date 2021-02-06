import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/homepage/HomePage";

function App() {
  const HatsPage = () => {
    return (
      <div>
        <h1>Hats Page</h1>
      </div>
    );
  };
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/shop/hats" component={HatsPage} />
    </Switch>
  );
}

export default App;
