// library imports
import React from 'react';

const Day = ( props ) => {
  let { day, startingWeekday } = props;
  const currentDate = new Date().getDate();

  return (
    <div
      className={`date ${day === currentDate ? "today" : ""} ${day < currentDate ? "past" : ""}`}
      style={ {gridColumn: day === 1 ? startingWeekday : ""} }
    >
      {day}
    </div>
  );
};

export default Day;