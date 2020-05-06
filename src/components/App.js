import React from 'react';
import '../App.css';
import '../assets/css/sb-admin-2.css';
import Header from './Header';
import Login from './Login';
import ListPage from './ListPage';
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";


class App extends React.Component {
  state = {
    uname: undefined,
    details: false,
    detailsBase: undefined,
    detailsGoal: undefined
  }

  showDetails = (base, goal) => {
    this.setState({details: true, detailsBase:base, detailsGoal: goal});
  };

  hideDetails = () => {
    this.setState({details: false});
    console.log("called!");
  };

  componentDidMount() {
    this.setState({uname: localStorage.getItem('username')});
  };

  onLogin = (loginResult) => {
    this.setState({ uname: loginResult });
  };

  logout = () => {
    this.setState({uname: undefined});
    localStorage.removeItem('username');
  };

  render() {
    
    return this.state.uname ? (
      <div>
        <BrowserRouter>
          <Switch>
            <Route render={() => <Redirect to={{pathname: "/"}} />} />
          </Switch>
        </BrowserRouter>
        <Header uname={this.state.uname} logout={this.logout}  details={this.state.details} />
        <ListPage showDetails={this.showDetails} details={this.state.details} hideDetails={this.hideDetails} 
          detailsBase={this.state.detailsBase} detailsGoal={this.state.detailsGoal} />
      </div> 
       ) : (
      <div>
        <BrowserRouter>
          <Switch>
            <Route render={() => <Redirect to={{pathname: "/"}} />} />
          </Switch>
        </BrowserRouter>
        <Header uname={this.state.uname} details={this.state.details}/>
        <Login uname={this.state.uname} onLogin={this.onLogin} />
      </div>
      );
  }
}

export default App;
