import React from 'react';
import { Redirect } from "react-router-dom";
import Logout from './Logout';
import { fakeAuth } from "../Router";


class Header extends React.Component {
  // const username = localStorage.getItem('username') !== null && localStorage.getItem('username').trim();
  // console.log('props', props);

  userout = () => {
    fakeAuth.loggedIn = false;
    localStorage.clear();

  }

  render() {
    // hát ez itt nem működik...
    if (!fakeAuth.loggedIn) {
      return <Redirect to={"/"} />;
    }
  return (
    <div>
      <h1>Exchange Rate App</h1>
      <p>{this.props.uname && `Hello ${this.props.uname}!`}</p>
      <div><Logout userout={this.userout} /></div>
    </div>
  );
  }
   

  }

export default Header;
