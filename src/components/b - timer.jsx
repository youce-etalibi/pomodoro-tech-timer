import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Alarm from "../media/clockAlarm.mp3";
const Timer = () => {
  const CountdownTimer = () => {
    const settings = useSelector((state) => state.settings);
    const alarm = new Audio(Alarm);
    const [timer, setTimer] = useState(settings.pomodoro * 60);
    const [isActive, setIsActive] = useState(false);
    const [currentBreakType, setCurrentBreakType] = useState("pomodoro");
    const [cycleCount, setCycleCount] = useState(0);
    const [pomodoroTime, setPomodoroTime] = useState(0);
    // console.log(settings)
    useEffect(() => {
      let intervalId;
      if (
        (currentBreakType === "pomodoro" && settings.autoStartPomodoro) ||
        (currentBreakType !== "pomodoro" && settings.autoStartShortBreak)
      ) {
        setIsActive(true);
      }
      if (isActive && timer > 0) {
        intervalId = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
      } else if (timer === 0) {
        alarm.play();
        handleBreakCompletion();
      } else {
        alarm.pause();
      }
      return () => clearInterval(intervalId);
    }, [
      isActive,
      timer,
      currentBreakType,
      settings.autoStartPomodoro,
      settings.autoStartShortBreak,
    ]);
    useEffect(() => {
      if (currentBreakType === "pomodoro" && cycleCount > 0) {
        setPomodoroTime((prevPomodoroTime) => prevPomodoroTime + timer);
      }
    }, [currentBreakType, cycleCount]);
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    };
    const handleButtonClick = (timeInSeconds, breakType) => {
      setTimer(timeInSeconds);
      setCurrentBreakType(breakType);
      setIsActive(false);
    };
    const handleBreakCompletion = () => {
      setIsActive(false);
      if (currentBreakType === "pomodoro") {
        setCycleCount((prevCycleCount) => prevCycleCount + 1);
        if (cycleCount % settings.longBreakInterval === 0 && cycleCount > 0) {
          setCurrentBreakType("longBreak");
          setTimer(settings.longBreak * 60);
        } else {
          setCurrentBreakType("shortBreak");
          setTimer(settings.shortBreak * 60);
        }
      } else {
        setCurrentBreakType("pomodoro");
        setTimer(settings.pomodoro * 60);
      }
    };
    const handleStopClick = () => {
      setIsActive(false);
    };
    const handleStartClick = () => {
      setIsActive(true);
    };
    const handleResetClick = () => {
      setIsActive(false);
      setTimer(settings.pomodoro * 60);
      setCurrentBreakType("pomodoro");
      setCycleCount(0);
    };
    return (
      <Fragment>
        <div className="pomodoroRec">
          <div className="listOptions">
            <button
              className="btnOption"
              onClick={() =>
                handleButtonClick(settings.pomodoro * 60, "pomodoro")
              }
            >
              Pomodoro
            </button>
            <button
              className="btnOption"
              onClick={() =>
                handleButtonClick(settings.shortBreak * 60, "shortBreak")
              }
            >
              Short Break
            </button>
            <button
              className="btnOption"
              onClick={() =>
                handleButtonClick(settings.longBreak * 60, "longBreak")
              }
            >
              Long Break
            </button>
          </div>
          <center>
            <div>
              <br />
              <h6 className="type"> - {currentBreakType} - </h6>
              <h1 className="timer">{formatTime(timer)}</h1>
              <div className="listbtnContrles">
                <button onClick={handleStopClick} className="stop">
                  <i className="bx bxs-hand"></i>
                </button>
                <button
                  onClick={handleStartClick}
                  title="Start"
                  className="start"
                >
                  Start
                </button>
                <button
                  onClick={handleResetClick}
                  title="Reset"
                  className="reset"
                >
                  <i className="bx bx-reset"></i>
                </button>
              </div>
              {/* <h5>Pomodoro Time: {formatTime(pomodoroTime)} MM:SS</h5> */}
              <br />
              <h5 className="fois">#{cycleCount}</h5>
            </div>
          </center>
        </div>
      </Fragment>
    );
  };
  return (
    <Fragment>
      <CountdownTimer />
    </Fragment>
  );
};
export default Timer;
