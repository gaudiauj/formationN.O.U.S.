/* eslint-disable react/prop-types */
import './App.css';
import { Typography, Box, Button } from '@mui/material';
import { Cell } from './components/Cell';
import { Timer } from './components/Timer';
import { useGameDispatch, GameProvider, useGame } from './gameContext';

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
