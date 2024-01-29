/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from 'react';
import { gameReducer, getInitialGame } from './gameReducer';

const GameDispatchContext = createContext(null);

const GameContext = createContext(null);

const gridSize = {
  width: 10,
  height: 10,
};

const quantityOfBomb = 1;

export function GameProvider({ children }) {
  const [game, dispatch] = useReducer(
    gameReducer,
    getInitialGame({
      gridSize,
      quantityOfBomb,
    })
  );

  return (
    <GameContext.Provider value={game}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
}

export function useGame() {
  const game = useContext(GameContext);
  if (game === undefined) {
    throw new Error('game must be used within a gameContext');
  }
  return game;
}

export function useGameDispatch() {
  const dispatch = useContext(GameDispatchContext);
  if (dispatch === undefined) {
    throw new Error('dispatch must be used within a gameContext');
  }
  return dispatch;
}
