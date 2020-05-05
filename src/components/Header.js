import React from 'react';
import Logout from './Logout';

const Header = (props) => {

    return props.uname ? (
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1>Exchange Rate App</h1>
        <p>{props.uname && `Hello ${props.uname}!`}</p>
        <div><Logout userout={props.logout} /></div>
      </div>
    ) : (
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1>Exchange Rate App</h1>
        </div>
    );
   
}

export default Header;
