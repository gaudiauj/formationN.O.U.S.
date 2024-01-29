/* eslint-disable react/prop-types */
import { Box, Button } from '@mui/material';
import { useGameDispatch } from '../gameContext';

export const Cell = ({ state, value, index }) => {
  // emojis : 🚩 💣

  const cell = {
    state,
    value,
    index,
  };
  const dispatch = useGameDispatch();
  return (
    <Box
      border={'1px solid #333'}
      borderRadius={'4px'}
      bgcolor={'#555'}
      minHeight={'24px'}
      display={'flex'}
    >
      <Button
        fullWidth
        onClick={() => dispatch({ type: 'onCellClick', payload: cell })}
        onContextMenu={(e) => {
          dispatch({ type: 'onFlagCell', payload: cell });
          e.preventDefault();
        }}
        sx={{
          height: '100%',
          margin: 0,
          padding: 0,
          '&:hover': {
            backgroundColor: '#444',
          },
          backgroundColor: cell.state === 'untouched' ? '#333' : '#555',
        }}
      >
        {cell.state === 'untouched'
          ? ''
          : cell.state === 'flagged'
          ? '🚩'
          : cell.value}
      </Button>
    </Box>
  );
};
