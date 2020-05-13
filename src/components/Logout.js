import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/user'


const Logout = (props) => {

    return (
      <div>
        <p><button onClick={() => props.dispatch(logout())} >Logout</button></p>
      </div>
    );
  };

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
};

export default connect(mapStateToProps)(Logout);
