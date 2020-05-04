import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import App from './components/App';
import ListPage from './components/ListPage';


export const fakeAuth = {
  loggedIn: false
};

const RequireAuth = ({ children }) => {
  if (!fakeAuth.loggedIn) {
    return <Redirect to={"/"} />;
  }

  return children;
};

const AppRouter = () => (
  <Switch>
    <Route exact path={"/list"} component={ListPage} />
    <Route exact path={"/"} component={App} />
    <RequireAuth>
      <Route exact path={"/list"} component={ListPage} />
    </RequireAuth>
  </Switch>
);


export default AppRouter;
