import React, { useEffect } from "react";

const Timer = ({
  setQNumber,
  setSeconds,
  seconds,
  qNumber,
  quizQuestions,
  setDisplayScore,
}) => {
  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((seconds) => seconds - 1);
      }

      if (seconds === 0) {
        if (qNumber < quizQuestions.length - 1) {
          setQNumber((qNumber) => qNumber + 1);
          setSeconds(20);
        } else {
          setDisplayScore(true);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return (
    <h5 className="time">
      Time Left - 00 : {seconds < 10 ? `0${seconds}` : seconds}
    </h5>
  );
};

export default Timer;
