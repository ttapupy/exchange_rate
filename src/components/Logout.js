import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/user'


const Logout = (props) => {

    return (
      <div>
        <p><button onClick={() => props.dispatch(login())} >Logout</button></p>
      </div>
    );
  };

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
};

export default connect(mapStateToProps)(Logout);
