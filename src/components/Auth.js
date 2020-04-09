import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from './../axiosCreate';

class Auth extends Component {
  constructor () {
    super();
    this.state = {
      email: '',
      password: '',
      isRegistered: false,
      isLoggedIn: false,
      emailError: ''
    }
  }

  validate = () => {
    if (!this.state.email.includes('@')) {
      this.setState({
        emailError: 'Invalid email id'
      })
      return false;
    }
    this.setState({
      emailError: ''
    })
    return true;
  }

  login = () => {
    const valid = this.validate();
    if(valid) {
      axios.post('/login',
        {
          email: this.state.email,
          password: this.state.password
        },
        {
          headers: {"Content-Type": "application/json"}
        }).then(res => {
          if (res.status === 204) {
            alert('Invalid user name and password');
          }
        if (res.status === 200) {
          localStorage.setItem("auth", res.data.sign_jwt);
          this.setState({
            isLoggedIn: true
          })
        }
      }).catch(e => {
        console.log('err', e);
      })
    }
  }

  register = () => {
    const valid = this.validate();
    if (valid){
      axios.post('/login/user',
        {
          email: this.state.email,
          password: this.state.password
        },
        {
          headers: { "Content-Type": "application/json" }
        }).then(res => {
        this.setState({
          email: '',
          password: ''
        })
      }).catch(e => {
        console.log('err', e);
      })
    }
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    return (
      <div>
        {
          this.state.isLoggedIn?<Redirect to='/home' /> : null
        }
        {
          !this.state.isRegistered ?
            <div>
                <input type='email' name='email' placeholder="email" value={this.state.email} onChange={this.onChange}/><br />
                <div style={{color: 'red'}}>{this.state.emailError}</div><br/>
                <input type='password' name='password' placeholder="password" value={this.state.password} onChange={this.onChange}/><br /><br/>
                <button onClick={this.login}>Login</button>
                <button onClick={() => this.setState({isRegistered: true})}>signUp</button>
            </div>:
            <div>
                <input type='email' name='email' placeholder="email" value={this.state.email} onChange={this.onChange}/><br />
                <div style={{color: 'red'}}>{this.state.emailError}</div><br/>
                <input type='password' name='password' placeholder="password" value={this.state.password} onChange={this.onChange}/><br /><br/>
                <button onClick={this.register}>Register</button>
                <button onClick={() => this.setState({isRegistered: false})}>Go to Login</button>
            </div>

        }
      </div>
    )
  }
}

export default Auth