import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  MdPlayArrow,
  MdPause,
  MdOutlineDoneOutline,
  MdOutlinePlayArrow,
  MdOutlinePauseCircle,
} from 'react-icons/md';
import { TbPlayerPlay, TbPlayerPause } from 'react-icons/tb';
import { BsPatchCheck, BsCheckCircle } from 'react-icons/bs';
import { FcCheckmark } from 'react-icons/fc';
import './Timer.scss';

//사용자 정의 Hook
const useCounter = (initialValue, ms) => {
  const [count, setCount] = useState(initialValue);
  const intervalRef = useRef(null);
  const start = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setCount((c) => c + 1);
    }, ms);
  }, []);
  const stop = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);
  const reset = useCallback(() => {
    setCount(0);
    stop();
  }, []);
  return { count, start, stop, reset };
};

export default function SetTimer() {
  //시, 분, 초를 state로 저장
  const [currentHours, setCurrentHours] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const { count, start, stop, reset } = useCounter(0, 1000);

  // 타이머 기능
  const timer = () => {
    const checkMinutes = Math.floor(count / 60);
    const hours = Math.floor(count / 3600);
    const minutes = checkMinutes % 60;
    const seconds = count % 60;
    setCurrentHours(hours);
    setCurrentSeconds(seconds);
    setCurrentMinutes(minutes);
  };

  // 토글
  const [isStart, setIsStart] = useState(false);
  const [isStop, setIsStop] = useState(true);

  function toggleStart() {
    setIsStart(!isStart);
  }
  function toggleStop() {
    setIsStop(!isStop);
  }

  // count의 변화에 따라 timer 함수 랜더링
  useEffect(timer, [count]);
  return (
    <div className="TimerTemplate">
      <div className="time">
        <div className="startToggle" onClick={toggleStart}>
          {isStart ? (
            <TbPlayerPlay className="start" onClick={start} />
          ) : (
            <TbPlayerPause className="stop" onClick={stop} />
          )}
        </div>

        {/* <button className="start" onClick={start}>
          <MdPlayArrow />
          </button>
          <button className="stop" onClick={stop}>
          <MdPause />
          </button>
          <button className="reset" onClick={reset}>
          <FcCheckmark />
        </button> */}
        <h1>
          {currentHours < 10 ? `0${currentHours}` : currentHours}:
          {currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes}:
          {currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}
          <BsCheckCircle className="reset" onClick={reset} />
        </h1>
      </div>
    </div>
  );
}
