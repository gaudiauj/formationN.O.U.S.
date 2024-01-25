import './App.css';
import Game from './domain/game';
import { Typography, Box } from '@mui/material';
import { Cell } from './components/Cell';

const gridSize = {
  width: 10,
  height: 10,
};

const quantityOfBomb = 10;
const grid = new Game(gridSize, quantityOfBomb).grid;
function App() {
  console.log(grid);
  return (
    <div className="App">
      <Typography variant="h1" gutterBottom>
        Démineur
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns={`repeat(${gridSize.width}, 1fr)`}
        gap={'1px'}
        borderRadius={'4px'}
        bgcolor={'#444'}
        padding={'20px'}
      >
        <Cell>cell</Cell>
      </Box>
    </div>
  );
}

export default App;
