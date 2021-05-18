import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';
import "./login.css";

const Login = (props) => {
  const {
    history
  } = props;
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const loginHandle = () => {
    axios.post('http://localhost:3001/api/login', {
      userName: userName,
      password: password
    }).then((result) => {
      if (result.data.autho) {
        const data = result.data;
        localStorage.setItem('TOKEN', data.token);
        history.push('home');
      } else {
        setError(true);
      }
    })
  }

  return(
    <div className="login">
      <div className="login-box">
        <h1>Login</h1>
        <p>For beat the froggy</p>
        <div className="login-box-intern">
          <TextField label="Username" value={userName} onChange={
              ({ target: { value } }) => {
                setUserName(value);
              }
          }/>
          <TextField type="password" label="Password" value={password} onChange={
              ({ target: { value } }) => {
                setPassword(value);
              }
          }/>
        </div>
        <a className="register-txt" href="/register" style={{marginTop: 5}}><strong>Register</strong></a>
        {error &&
          <p className="password-worn">Incorrect username or password</p>
        }    
        <Button style={{margin: 20}} className="btn-login" onClick={loginHandle}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;