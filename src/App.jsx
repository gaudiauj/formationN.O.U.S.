import './App.css';
import Game from './domain/game';
import { Typography, Box } from '@mui/material';
import { Cell } from './components/Cell';
import { Timer } from './components/Timer';
import { useState } from 'react';

const gridSize = {
  width: 10,
  height: 10,
};

const quantityOfBomb = 10;
const grid = new Game(gridSize, quantityOfBomb).grid;

function App() {
  const cells = grid.map((cell) => {
    // values.push(cell.value);
    return <Cell key={cell.index} value={cell.value} />;
  });
  return (
    <div className="App">
      <Typography variant="h1" gutterBottom>
        Démineur
      </Typography>
      <Timer></Timer>
      <Box
        display="grid"
        gridTemplateColumns={`repeat(${gridSize.width}, 1fr)`}
        gap={'1px'}
        borderRadius={'4px'}
        bgcolor={'#444'}
        padding={'20px'}
      >
        {cells}
      </Box>
    </div>
  );
}

export default App;
