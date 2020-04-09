import React from 'react'
import {Link } from 'react-router-dom'

function Navigation () {

  return (
    <div className='nav'>
      <Link to="/home">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/list">List</Link>
      <Link to="/login">Login</Link>
      <Link to="/logout">Logout</Link>

    </div>
  )
}

export default Navigation