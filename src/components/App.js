import React from 'react'
import '../App.css'
import '../assets/css/sb-admin-2.css'
import Header from './Header'
import Login from './Login'
import ListPage from './ListPage'
import { connect } from 'react-redux'
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom"


function App(props) {

  return props.user.uname ? (
    <div>
      <BrowserRouter>
        <Switch>
          <Route render={() => <Redirect to={{ pathname: "/" }} />} />
        </Switch>
      </BrowserRouter>
      <Header />
      <ListPage />
    </div>
  ) : (
      <div>
        <BrowserRouter>
          <Switch>
            <Route render={() => <Redirect to={{ pathname: "/" }} />} />
          </Switch>
        </BrowserRouter>
        <Header />
        <Login />
      </div>
    )

};

const mapStateToProps = (state) => {
  return {
    rates: state.rates,
    filters: state.filters,
    user: state.user
  }
};

export default connect(mapStateToProps)(App);
