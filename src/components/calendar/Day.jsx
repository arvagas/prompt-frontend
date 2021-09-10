// library imports
import React, {useState} from "react";
// component imports
import AppointmentModal from "../modals/AppointmentModal";
// hook imports
import useModal from "../../hooks/useModal";

const Day = ( props ) => {
  const { day, startingWeekday } = props;
  const currentDate = new Date().getDate();
  const { isShowing, toggle } = useModal();

  return (
    <div
      className={`date ${day.date === currentDate ? "today" : ""} ${day.date < currentDate ? "past" : ""}`}
      style={ {gridColumn: day.date === 1 ? startingWeekday : ""} }
      onClick={toggle}
    >
      {day.date}
      <AppointmentModal key={new Date().getTime()} day={day} isShowing={isShowing} toggle={toggle} />
    </div>
  );
};

export default Day;