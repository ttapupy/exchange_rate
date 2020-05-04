import React from 'react';
import '../App.css';
import { Redirect } from "react-router-dom";
import { fakeAuth } from "../Router";



class Login extends React.Component {
 
  state = {
    unameError: true
  }

  handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value.trim();
    const json = JSON.stringify(username);
    localStorage.setItem('username', json);  
    console.log(username); 
    console.log(this.state); 
    this.props.onLogin({ uname: username });
    fakeAuth.loggedIn = true ;

  };

  handleUname = (e) => {
    const name = e.target.value.trim().length;
    this.setState(() => ({ unameError: name < 3 }));
    return (name < 3);
  }

  render() {
    if (fakeAuth.loggedIn) {
      return <Redirect to={"/list"} />;
    }
    return (
      <div className="App">
        Belépés
        <div>
          <form onSubmit={this.handleLogin}>
            <input type="text" name="username" 
              onChange={this.handleUname}
            />
            <button disabled={this.state.unameError} >Login</button>
          </form>
        </div>

      </div>
    );
  }
}


export default Login;
