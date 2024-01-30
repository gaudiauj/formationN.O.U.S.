/* eslint-disable react/prop-types */
import './App.css';
import { Typography, Box, Button } from '@mui/material';
import { Cell } from './components/Cell';
import { Timer } from './components/Timer';
import { useGameDispatch, GameProvider, useGame } from './gameContext';
import { WonForm } from './components/WonForm';
import { useEffect, useState } from 'react';

const gridSize = {
  width: 10,
  height: 10,
};

const quantityOfBomb = 10;

const RestartButton = () => {
  const dispatch = useGameDispatch();
  return (
    <Button
      onClick={() =>
        dispatch({
          type: 'onRestart',
          payload: { gridSize, quantityOfBomb },
        })
      }
    >
      Recommencer ?
    </Button>
  );
};

function Game() {
  const [scores, setScores] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/score', {
      mode: 'cors',
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setScores(data);
      })
      .catch((error) => console.log(error));
  }, []);
  const game = useGame();
  if (game.state === 'win') {
    return (
      <div className="App">
        <Typography variant="h1" gutterBottom>
          Démineur
        </Typography>
        <Typography variant="h2" gutterBottom>
          Vous avez gagné
        </Typography>
        <WonForm />
        <RestartButton />
      </div>
    );
  }

  if (game.state === 'lose') {
    return (
      <div className="App">
        <Typography variant="h1" gutterBottom>
          Démineur
        </Typography>
        <Typography variant="h2" gutterBottom>
          Vous avez perdu
        </Typography>
        <RestartButton />
      </div>
    );
  }
  return (
    <div className="App">
      <Typography variant="h1" gutterBottom>
        Démineur
      </Typography>
      <Typography variant="h2" gutterBottom>
        Score
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        border="1px solid black"
        borderRadius="4px"
        padding="8px"
        margin="8px"
      >
        {scores
          .sort((a, b) => b.score - a.score)
          .slice(0, 5)
          .map((score, _index) => (
            <Box key={_index}>
              <Typography variant="h3" gutterBottom>
                {score.pseudo}
              </Typography>
              <Typography variant="h4" gutterBottom>
                {score.score}
              </Typography>
            </Box>
          ))}
      </Box>
      <Timer initialTime={game.time} />
      <Box
        display="grid"
        gridTemplateColumns={`repeat(${gridSize.width}, 1fr)`}
        gap={'1px'}
        borderRadius={'4px'}
        bgcolor={'#444'}
        padding={'20px'}
      >
        {game.getFLatGrid().map((cell) => (
          <Cell key={cell.index} {...cell} />
        ))}
      </Box>
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}

export default App;
