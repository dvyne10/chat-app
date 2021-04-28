import React, { Component, useEffect } from "react";
import Authenticate from "./Pages/Auth/auth0Provider";
import { useAuth0 } from "@auth0/auth0-react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//Pages
import { Join, Chat } from "./Pages";

const App = () => {
  const { user, loginWithRedirect,isAuthenticated } = useAuth0();
  console.log(user,'user');

  // if (!user && !isAuthenticated) {
  //   return null;
  // }
 
  return (
    <Router>
      <Authenticate>
        <Switch>
          <Route path="/" exact component={Join} />
          <Route path="/chat" exact component={Chat} />
        </Switch>
      </Authenticate>
    </Router>
  );
};

export default App;
