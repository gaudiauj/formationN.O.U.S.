/* eslint-disable react/prop-types */

import { useState, useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import { useGameDispatch, useGame } from '../gameContext';

export const Timer = () => {
  const dispatch = useGameDispatch();
  const game = useGame();
  const [time, setTime] = useState(game.time);
  const [isRunning, setIsRunning] = useState(false);
  const intervalId = useRef(null);

  const createTimer = () => {
    intervalId.current = setInterval(() => {
      setTime((time) => time - 1);
      dispatch({ type: 'onTimeUpdate', payload: (time) => time - 1 });
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
