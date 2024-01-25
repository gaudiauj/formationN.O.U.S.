/* eslint-disable react/prop-types */
import { Box, Button } from '@mui/material';

export const Cell = () => {
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
        }}
      >
        💣
      </Button>
    </Box>
  );
};
