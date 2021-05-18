import React, { useEffect, useState } from 'react';
import { TextField, Tooltip } from '@material-ui/core';
import profile from '../../media/profile.png';
import love from '../../media/love.png';
import axios from 'axios';
import './home.css';

const controlOpenModal = () => {
  const show = localStorage.getItem('showAbout');
  if (show != null) {
    if (show === "false")
      return false;
    return true;
  } else {
    return true;
  }
}

const Home = (props) => {
  const {
    history
  } = props;
  const [userData, setUserData] = useState({});
  const [showPop, setShowPop] = useState(controlOpenModal());

  useEffect(() => {
    axios.get('https://back-froggy.herokuapp.com/api/users',
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
  }, []);

  const handleAbout = () => {
    setShowPop(false);
    localStorage.setItem('showAbout', false);
  }

  return(
    <div className="home">
      {showPop &&
        <div className="main-pop">
          <div className="popup-about" onClick={handleAbout}>
            <h1>The Frogamer</h1>
            <p>This site is based on hitting Frogamer, the one little frog who likes to help others when you have rage playing video games.

            Click on the green frog to start, apart from that you have a score to see how long you've been hitting me! </p>
            <div className="img-text">
              <img src={love} alt="love"/>
              <p>Don't worry about me, I'm an immortal frog</p>
            </div>
          </div>
        </div>
      }
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