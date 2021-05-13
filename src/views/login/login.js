import React, { useState, useEffect }  from 'react';
import { TextField, Button } from '@material-ui/core';
import "./login.css";

const Login = (props) => {

  return(
    <div className="login">
      <div className="login-box">
        <h1>Login</h1>
        <p>For beat the froggy</p>
        <div className="login-box-intern">
          <TextField label="Username"/>

          <TextField type="password" label="Password"/>
        </div>
        <Button style={{margin: 20}} className="btn-login">
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;