import React from 'react';

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.username && <p>Hello {props.username}!</p>}
    </div>
  );
}

export default Header;
