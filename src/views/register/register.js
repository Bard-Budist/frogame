import React, { useState }  from 'react';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';
import glass from '../../media/gafas.png'
import "./register.css";


const Register = (props) => {
  const {
    history
  } = props;
  const [error, setError] = useState(false);
  const [mesage, setMesage] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const createUser = async () => {
    if (name === "" || lastName === "" || email === "" || username === "" || password === "") {
      setMesage("Incomplete fields or error");
      setError(true);
      return;
    }
    axios.post('http://localhost:3001/api/users', {
      name: name,
      lastName: lastName,
      email: email,
      userName: username,
      password: password
    }).then((data) => {
      if (data.data.error){
        setMesage("User name already exist");
        setError(true);
      } else {
        history.push("/login");
      }
    })
    .catch((err) => {
      setError(true);
    })
  }

  return(
    <div className="register">
      <div className="register-box">
        <div className="register-section-1">
          <h1 style={{textAlign: 'center'}}>Register</h1>
          <p style={{textAlign: 'center', marginTop: '-1.5em'}}>For beat the froggy</p>
          <div className="register-box-intern">
            <TextField label="Name" value={name} onChange={
              ({ target: { value } }) => {
                setName(value);
              }
            }/>
            <TextField label="Last name" value={lastName} onChange={
              ({ target: { value } }) => {
                setLastname(value);
              }
            }/>
            <TextField label="Email" value={email} onChange={
              ({ target: { value } }) => {
                setEmail(value);
              }
            }/>
            <TextField label="Username" value={username} onChange={
              ({ target: { value } }) => {
                setUsername(value);
              }
            }/>
            <TextField type="password" label="Password" value={password} onChange={
              ({ target: { value } }) => {
                setPassword(value);
              }
            }/>
          </div>
          {error && 
            <p className="error-register">{mesage}</p>
          }
          <Button style={{margin: 20}} className="btn-register" onClick={createUser}>
            Register
          </Button>
        </div>
        

        <div className="register-section-2">
          <p>Do not accumulate your anger when playing, for I am</p>
          <div className="box-image-register">
            <img src={glass} alt="Logo"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;