import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import validateLogin from './../../other/validateLogin';
import validatePass from './../../other/validatePass';

import './Auth.css';
import { InputGroup, FormControl, Button } from 'react-bootstrap';


class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      isValidLogin: false,
      isValidPass: false,
      error: {
        isError: false,
        message: ''
      }
    }
  }

  onLogin(value) {
    const correctLogin = validateLogin(value);
    const isValid = correctLogin.length >= 6 && correctLogin.length <= 25;
    this.setState({
      login: correctLogin,
      isValidLogin: isValid
    });
  }

  onPassword(value) {
    const correctPass = validatePass(value);
    const isValid = correctPass.length >= 6 && correctPass.length <= 25;
    this.setState({
      password: correctPass,
      isValidPass: isValid
    });
  }

  enterApp() {
    axios.post('/api/login', {
      login: this.state.login,
      password: this.state.password
    })
      .then(response => {
      })
      .catch(error => {
        if (this.state.login === 'demo12' && this.state.password === '12345aA') {
          this.props.setToken('example')
        } else {
          this.setState({
            error: {
              isError: true,
              message: 'Wrong login or password'
            }
          });
        }
      });
  }

  render() {
    const isAuth = this.props.token;
    return (
      <div className='div_auth'>
        <InputGroup className="mb-3">
          <FormControl
            onChange={({ target: { value } }) => this.onLogin(value)}
            value={this.state.login}
            placeholder="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
            type="password"
            onChange={({ target: { value } }) => this.onPassword(value)}
            value={this.state.password}
            placeholder="Password"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <Button variant="success" type="submit" onClick={() => this.enterApp()} disabled={!(this.state.isValidLogin && this.state.isValidPass)} >
          Submit
        </Button>
        {this.state.error.isError && <div className="error_div">{this.state.error.message}</div>}
        {isAuth && <Redirect to='/companies/list' />}
      </div>
    )
  }
}

export default connect(
  state => ({
    token: state.auth.token
  }),
  dispath => ({
    setToken: (token) => {
      dispath({
        type: 'SET_TOKEN',
        payload: token
      });
    }
  })
)(Auth);


