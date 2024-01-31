/* eslint-disable react/prop-types */
import { Box, Button } from '@mui/material';
import { useState } from 'react';

export const Cell = ({ value, auClic, state, auClicDroit }) => {
  // const AuClic = () => {
  //   setIsClicked(true);
  // };

  // state :
  // untouched
  // digged
  // flagged
  // emojis : 🚩 💣
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
        sx={{
          height: '100%',
          margin: 0,
          padding: 0,
          '&:hover': {
            backgroundColor: '#444',
          },
          backgroundColor: state == 'digged' ? ' #555' : '#333',
        }}
        onContextMenu={auClicDroit}
        onClick={auClic}
      >
        {state == 'flagged' ? '🚩' : state == 'digged' ? value : ''}
      </Button>
    </Box>
  );
};
