import React from 'react';
import {Redirect} from 'react-router-dom';

function Protected(props) {
  const Component = props.cmp;
  let auth = localStorage.getItem('auth');
    return (
      <div>
        {auth? <Component/> : <Redirect to='/login'/>}
      </div>
    )
}

export default Protected