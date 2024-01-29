/* eslint-disable react/prop-types */

import { useState, useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import { useGameDispatch } from '../gameContext';

export const Timer = ({ initialTime }) => {
  const dispatch = useGameDispatch();
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalId = useRef(null);

  const createTimer = () => {
    intervalId.current = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
    setIsRunning(true);
  };

  const startTimer = () => {
    if (isRunning) return;
    createTimer();
  };

  const StopTimer = () => {
    clearInterval(intervalId.current);
    setIsRunning(false);
  };

  useEffect(() => {
    createTimer();

    return () => StopTimer();
  }, []);

  if (time === 0) {
    StopTimer();
    setTime(initialTime);
    dispatch({ type: 'onTimerEnd' });
  }

  return (
    <>
      <div>
        {Math.floor(time / 60)} : {time % 60}
      </div>
      <Button onClick={StopTimer} type="button">
        stop
      </Button>
      <Button onClick={startTimer} type="button" disabled={isRunning}>
        start
      </Button>
    </>
  );
};
