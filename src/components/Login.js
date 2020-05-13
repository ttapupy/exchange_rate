import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/user'
import '../App.css'


function Login(props) {
 
  const [unameError, setUnameError] = useState(true)


  const handleLogin = (e) => {
    e.preventDefault()
    const username = e.target.elements.username.value.trim()
    props.dispatch(login(username))
  }

  const handleUname = (e) => {
    const name = e.target.value.trim().length
    setUnameError(name < 3 )
  }

    return (
      <div className="content">
        <p>Login</p> <br/>
        <div className="align-items-center justify-content-between mb-4">
          <form onSubmit={handleLogin}>
            <input type="text" name="username" 
              onChange={(e) => handleUname(e)}
            />
            <button id="signIn" disabled={unameError} >Login</button>
          </form>
        </div>
      </div>
    )

};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    details: state.details
  }
};

export default connect(mapStateToProps)(Login);
