import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';

class Logout extends Component {

  render () {
    return (
      <div>
        {
          localStorage.clear()
        }
        <Redirect to='/login'/>
      </div>
    )
  }
}
export default Logout
