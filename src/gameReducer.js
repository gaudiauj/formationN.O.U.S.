import Game from './domain/game';

export const getInitialGame = ({ gridSize, quantityOfBomb }) => {
  const game = new Game(gridSize, quantityOfBomb);
  return game;
};

export function gameReducer(game, action) {
  switch (action.type) {
    case 'onCellClick': {
      return game.digCell(action.payload);
    }
    case 'onFlagCell': {
      return game.flagCell(action.payload);
    }
    case 'onTimerEnd': {
      return game.onTimerEnd();
    }
    case 'onRestart': {
      return getInitialGame({ ...action.payload });
    }
    default: {
      throw Error('Action inconnue : ' + action.type);
    }
  }
}
