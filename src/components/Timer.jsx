/* eslint-disable react/prop-types */
import { Box, Button } from '@mui/material';
import { useState, useRef, useEffect } from 'react';

export const Timer = ({ count, setCount, state }) => {
  const intervalID = useRef(null);
  useEffect(() => {
    intervalID.current = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);

    return () => {
      clearInterval(intervalID.current);
    };
  }, []);

  const stopCount = () => {
    clearInterval(intervalID.current);
  };

  if (count == 0 || state == 'win') {
    stopCount();
  }
  return (
    <Box
      border={'1px solid #333'}
      borderRadius={'4px'}
      bgcolor={'#fff'}
      minHeight={'24px'}
      display={'flex'}
    >
      <div>
        Timer :{Math.floor(count / 60)} : {count % 60}
      </div>
      <Button onClick={stopCount}> Stop </Button>
    </Box>
  );
};
