/* eslint-disable react/prop-types */
import { Box, Button } from '@mui/material';
import { useState, useRef, useEffect } from 'react';

export const Timer = () => {
  const [count, setCount] = useState(10);

  const intervalID = useRef(null);
  useEffect(() => {
    console.log('effect');
    intervalID.current = setInterval(() => {
      console.log('coucou', count);
      setCount((count) => count - 1);
    }, 1000);

    return () => {
      clearInterval(intervalID.current);
    };
  }, []);

  const stopCount = () => {
    clearInterval(intervalID.current);
  };

  if (count == 0) {
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
