// library imports
import React from 'react';
// component imports
import Day from "./Day";

const Month = () => {
  const dateObj = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30 ,31];
  const dayOfWeek = ["Sunday", "Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const firstDayOfMonth = new Date(`${dateObj.getMonth() + 1} 01, ${dateObj.getFullYear()}`)

  let days = Array.from({length: monthDays[dateObj.getMonth()]}, (_, index) => index + 1);

  return (
    <div className="month">
      <h1 className="month-header">{months[dateObj.getMonth()]} {dateObj.getFullYear()}</h1>

      <div className="day-of-week">
        {dayOfWeek.map((weekdayName, index) => (
          <div key={new Date().getTime() + index}>
            {weekdayName}
          </div>
        ))}
      </div>

      <div className="date-grid">
        {days.map((day, index) => (
          <Day day={day} startingWeekday={firstDayOfMonth.getDay()} key={new Date().getTime() + index}/>
        ))}
      </div>

    </div>
  );
};

export default Month;