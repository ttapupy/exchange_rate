import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ExchangeRateApp from './App';
import ListPage from './components/ListPage';
import DetailsPage from './components/DetailsPage';
import NotFoundPage from './components/404';
import Header from './components/Header';



const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={ExchangeRateApp} exact={true} />
        <Route path="/list" component={ListPage} exact={true} />
        <Route path="/details" component={DetailsPage} exact={true} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
