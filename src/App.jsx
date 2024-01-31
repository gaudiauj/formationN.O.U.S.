import './App.css';
import Game from './domain/game';
import { Typography, Box } from '@mui/material';
import { Cell } from './components/Cell';
import { Timer } from './components/Timer';
import { useState, useEffect } from 'react';
import { CongratsForm } from './components/Form';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const gridSize = {
  width: 10,
  height: 10,
};

const quantityOfBomb = 1;

function App() {
  const [game, setGame] = useState(new Game(gridSize, quantityOfBomb));

  const { data: userList, isLoading } = useQuery({
    queryKey: ['list'],
    queryFn: () =>
      fetch('http://localhost:3000/score', {
        method: 'GET',
        mode: 'cors',
      }).then((res) => res.json()),
  });

  const cells = game.grid.map((cell) => {
    return (
      <Cell
        key={cell.index}
        value={cell.value}
        state={cell.state}
        auClic={() => {
          setGame(game.digCell(cell));
        }}
        auClicDroit={(event) => {
          event.preventDefault();
          setGame(game.flagCell(cell));
        }}
      />
    );
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Typography variant="h1" gutterBottom>
            Démineur
          </Typography>
          <Timer
            count={game.time}
            setCount={(updateCount) => {
              setGame(game.setTimes(updateCount(game.time)));
            }}
            state={game.state}
          />
          {game.state == 'lose' && <div>Vous avez perdu</div>}
          {game.state == 'win' && (
            <>
              <div>Vous avez gagné</div>
              <CongratsForm score={game.time} />
            </>
          )}
          {game.state == 'playing' && (
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
          )}
        </div>
        <div>
          <h2>Tableau des Scores</h2>
          {!isLoading ? (
            userList.map((user, index) => (
              <div key={index}>
                {user.pseudo} | {user.email} | {user.score}{' '}
              </div>
            ))
          ) : (
            <div>Chargement...</div>
          )}
        </div>
      </QueryClientProvider>
    </>
  );
}

const queryClient = new QueryClient();

export default function tata() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />;
    </QueryClientProvider>
  );
}
