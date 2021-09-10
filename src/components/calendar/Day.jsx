// library imports
import React, { useContext } from "react";
// component imports
import AppointmentModal from "../modals/AppointmentModal";
// hook imports
import useModal from "../../hooks/useModal";
// context imports
import { DateTimeContext } from '../../contexts/DateTimeContext';

const Day = ( props ) => {
  const { day, startingWeekday } = props;
  const {
    defaultStartTime, defaultEndTime,
    currentDate, setCurrentDate,
    selectedMonth, setSelectedMonth,
    selectedYear, setSelectedYear
  } = useContext(DateTimeContext);
  const { isShowing, toggle } = useModal();

  return (
    <div
      className={`date ${day.date === currentDate.getDate() ? "today" : ""} ${day.date < currentDate.getDate() ? "past" : ""}`}
      style={ {gridColumn: day.date === 1 ? startingWeekday : ""} }
      onClick={toggle}
    >
      {day.date}
      <AppointmentModal key={new Date().getTime()} day={day} isShowing={isShowing} toggle={toggle} />
    </div>
  );
};

export default Day;