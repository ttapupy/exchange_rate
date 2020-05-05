import React from 'react';
import { Redirect } from "react-router-dom";
import Logout from './Logout';
import { fakeAuth } from "../Router";


class Header extends React.Component {

  state = {
    loggedIn: true
  }

  userout = () => {
    fakeAuth.loggedIn = false;
    localStorage.removeItem('username');
    this.setState({loggedIn: false});

  }

  render() {
    
    console.log("hhh", this.props)
    if (!this.state.loggedIn) {
      return <Redirect to={"/"} />;
    }
    console.log(this.props.uname);
  return (
    <div>
      <h1>Exchange Rate App</h1>
      {/* ez itt nem működik, mert nem kapja vissza az updatelt props-ot a szülőtől: */}
      <p>{this.props.uname && `Hello ${this.props.uname}!`}</p>
      <div><Logout userout={this.userout} /></div>
    </div>
  );
  }
   

  }

export default Header;
