// library imports
import React from 'react';
// component imports
import Day from "./Day";

const Month = () => {
  const dateObj = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayOfWeek = ["Sunday", "Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const days = Array.from({length: new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0).getDate()}, (_, index) => {
    return {
      month: months[dateObj.getMonth()],
      date: index + 1,
      year: dateObj.getFullYear()
    }
  });
  const firstDayOfMonth = new Date(`${dateObj.getMonth() + 1} 01, ${dateObj.getFullYear()}`).getDay() + 1;

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
          <Day day={day} startingWeekday={firstDayOfMonth} key={new Date().getTime() + index}/>
        ))}
      </div>

    </div>
  );
};

export default Month;