import React, { useEffect, useState } from 'react';
import { TextField, Tooltip } from '@material-ui/core';
import profile from '../../media/profile.png';
import axios from 'axios';
import './home.css';

const Home = (props) => {
  const {
    history
  } = props;
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3001/api/users',
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('TOKEN')}` 
      }
    }).then((result) => {
      if (result.data.refresh) {
        history.push("/login");
      } else {
        const data = result.data.user
        localStorage.setItem('points', data.points)
        setUserData(data)
      }
    })
  }, [history]);

  return(
    <div className="home">
      <div className="profile-section">
        <div className="profile-photo" onClick={() => {
          history.push('/game')
        }}>
          <Tooltip title="Click me to play!">
            <div style={{textAlign: 'center'}}>
              <img src={profile} alt="profile_froggy"/>
            </div>
          </Tooltip>
        </div>
        <div className="section-profile">
          <TextField disabled style={{marginLeft: 30, marginRight: 30, marginTop: 20}} label="Username" value={userData.userName || ""}/>
          <TextField disabled style={{marginLeft: 30, marginRight: 30, marginTop: 20}} label="Email" value={userData.email || ""}/>
          <TextField disabled style={{marginLeft: 30, marginRight: 30, marginTop: 20}} label="Name" value={userData.name || ""}/>
          <TextField disabled style={{marginLeft: 30, marginRight: 30, marginTop: 20}} label="Lastname" value={userData.lastName || ""}/>
          <TextField disabled style={{marginLeft: 30, marginRight: 30, marginTop: 20}} label="Beats Frogy" value={userData.points || "0"}/>
        </div>
      </div>
    </div>
  );
}

export default Home;