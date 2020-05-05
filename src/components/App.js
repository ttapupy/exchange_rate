import React from 'react';
import '../App.css';
import '../assets/css/sb-admin-2.css';
import Header from './Header';
import Login from './Login';
import ListPage from './ListPage';
import { Route, Switch, BrowserRouter } from "react-router-dom";


class App extends React.Component {
  state = {
    uname: undefined
  }

  componentDidMount() {
    this.setState({uname: localStorage.getItem('username')});
  }

  onLogin = (loginResult) => {
    this.setState({ uname: loginResult });
  }

  logout = () => {
    this.setState({uname: undefined});
    localStorage.removeItem('username');
  }

  render() {

    return this.state.uname ? (
    <div>
      <Header uname={this.state.uname} logout={this.logout} />
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={ListPage} />
        </Switch>
      </BrowserRouter>
    </div>
    ) : (
      <div>
        <Header uname={this.state.uname} />
        <Login uname={this.state.uname} onLogin={this.onLogin} />
      </div>
    );
  }
}

export default App;
