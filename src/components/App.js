import React from 'react';
import '../App.css';
import Header from './Header';
import Login from './Login';


class App extends React.Component {
  state = {
    uname: undefined
  }

  onLogin = (loginResult) => {
    this.setState({ uname: loginResult });
    
  }

  render() {

    return (
    <div>
      <Header uname={this.state.uname} />
      <Login onLogin={this.onLogin} />
    </div>
    );
  }
}

export default App;
