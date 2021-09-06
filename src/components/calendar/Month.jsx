// library imports
import React from 'react';
// component imports
import Day from "./Day";

const Month = () => {
  let dayOfWeek = ["Sunday", "Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let days = Array.from({length: 30}, (_, index) => index + 1);

  return (
    <div>
      <h1 class="month-name">September 2021</h1>

      <div class="day-of-week">
        {dayOfWeek.map((weeklyDay, index) => (
          <div class="weekly-day">
            {weeklyDay}
          </div>
        ))}
      </div>
      
      <div class="date-grid">
        {days.map((day, index) => (
          <Day day={day} placement={index} />
        ))}
      </div>

    </div>
  )
}

export default Month;