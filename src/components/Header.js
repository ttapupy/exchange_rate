import React from 'react'
import Logout from './Logout'
import { connect } from 'react-redux'

const Header = (props) => {
  const username = props.user && props.user.uname
  return username ? (
      <div className="content d-sm-flex align-items-center justify-content-between mb-4">
        <h1>Exchange Rate App</h1>
      <p>{`Hello ${username}!`}</p>
        <div><Logout /></div>
      </div>
    ) : (
        <div className="content d-sm-flex align-items-center justify-content-between mb-4">
          <h1>Exchange Rate App</h1>
        </div>
    )
   
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
};

export default connect(mapStateToProps)(Header);
