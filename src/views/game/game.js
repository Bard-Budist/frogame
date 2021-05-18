import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';
import slap from '../../media/slap.mp3';
import happy from '../../media/happy.png';
import sad from '../../media/sad.png';
import "./game.css";

const Game = (props) => {
  const {
    history
  } = props;
  const [numberClicks, setNumberClicks] = useState(parseInt(localStorage.getItem("points")) || 0);

  const [isPress, setIsPress] = useState(true);
  let audio = new Audio(slap)

  const playSlap = () => {
    audio.volume = 0.2;
    audio.play();
  }

  useEffect(() => {
    const slapEvent = document.getElementById('froggy');
  
    slapEvent.onmousedown = function() {
      setIsPress(false);
      playSlap();
      setNumberClicks(numberClicks + 1);
    };

    slapEvent.onmouseup = function() {
      setIsPress(true);
    };
    
  });

  const updatePoints = () => {
    axios.put('http://localhost:3001/api/game/points',
    {
      points: numberClicks
    },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('TOKEN')}` 
      }
    }).then((result) => {
      if (result.data.refresh) {
        history.push("/login");
      }
      localStorage.setItem('points', numberClicks)
    }).catch((error) => {
      history.push("/login");
    })
  }

  return(
    <div className="game">
      <p className="point-number">
        {numberClicks}
      </p>
      <div id="froggy">
      {isPress &&
        <img src={happy} alt="Happy-Frog"/>
      }
      {!isPress &&
        <img src={sad} alt="Sad-Frog"/>
      }
      
      </div>
      <Button className="btn-send" onClick={updatePoints}>Guardar</Button>
    </div>
  );
}

export default Game;