// library imports
import React, { useContext } from 'react';
// component imports
import Day from "./Day";
// context imports
import { DateTimeContext } from '../../contexts/DateTimeContext';
// data import
import { months, dayOfWeek } from '../../data/calendar';

const Month = () => {
  const {
    defaultStartTime, defaultEndTime,
    currentDate, setCurrentDate,
    selectedMonth, setSelectedMonth,
    selectedYear, setSelectedYear
  } = useContext(DateTimeContext)
  const days = Array.from({length: new Date(selectedYear, selectedMonth + 1, 0).getDate()}, (_, index) => {
    return {
      month: currentDate.getMonth(),
      date: index + 1,
      year: currentDate.getFullYear()
    }
  });
  const firstDayOfMonth = new Date(`${selectedMonth + 1} 01, ${selectedYear}`).getDay() + 1;

  return (
    <div className="month">
      <h1 className="month-header">{months[selectedMonth]} {selectedYear}</h1>

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