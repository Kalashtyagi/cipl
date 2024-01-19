import React, { useState } from "react";
import Star from "./Star";

const Rating = ({ stars, max }) => {
  const [dynamicValue, setDynamicValue] = useState(stars);
  const [value, setValue] = useState(0);

  const _colors = {
    1: "#f44336",
    2: "#FF5722",
    3: "#FF9800",
    4: "#FFC107",
    5: "#FFEB3B",
  };

  const _meanings = {
    0: "No Rating 🚫",
    1: "Poor 🤮",
    2: "Fair 😒",
    3: "Average 😐",
    4: "Good 🙂",
    5: "Excellent 🔥",
  };

  const handleClick = (newValue) => {
    setValue(newValue);
    setDynamicValue(newValue);
  };

  const handleMouseEnter = (newValue) => {
    setDynamicValue(newValue);
  };

  const handleMouseLeave = () => {
    setDynamicValue(value);
  };

  const starSpans = [];
  const maxStars = max || 5;

  for (let v = 1; v <= maxStars; v++) {
    starSpans.push(
      <Star
        key={v}
        color={_colors[v]}
        isFilled={v <= dynamicValue}
        value={v}
        handleHover={handleMouseEnter}
        handleHoverLeave={handleMouseLeave}
        handleClick={handleClick}
      />
    );
  }

  return (
    <div className="ml-5 rating_feedback">
      <p>{_meanings[value]}</p>
      <h1>{starSpans}</h1>
    </div>
  );
};

Rating.defaultProps = {
  max: 5,
};

export default Rating;
