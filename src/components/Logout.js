import React from 'react';

const Logout = (props) => {

    return (
      <div>
        <p><button onClick={props.userout} >Logout</button></p>
      </div>
    );
  }

export default Logout;
