import React from 'react';

class Logout extends React.Component {

  render() {

    return (
      <div>
        <p><button onClick={this.props.userout} >Logout</button></p>
      </div>
    );
  }

}

export default Logout;
