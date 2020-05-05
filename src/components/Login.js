import React from 'react';
import '../App.css';


class Login extends React.Component {
 
  state = {
    unameError: true
  }

  handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value.trim();
    localStorage.setItem('username', username);
    this.props.onLogin(username);

  };

  handleUname = (e) => {
    const name = e.target.value.trim().length;
    this.setState(() => ({ unameError: name < 3 }));
    return (name < 3);
  }

  render() {

    return (
      <div>
        Login
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
