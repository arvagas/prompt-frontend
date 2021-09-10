// library imports
import React, { useState, useEffect, useContext } from "react";
// component imports
import AppointmentModal from "../modals/AppointmentModal";
// hook imports
import useModal from "../../hooks/useModal";
// context imports
import { DateTimeContext } from '../../contexts/DateTimeContext';
import { SchedulesContext } from "../../contexts/SchedulesContext";

const Day = ( props ) => {
  const { day, startingWeekday } = props;
  const {
    defaultStartTime, defaultEndTime,
    currentDate, setCurrentDate,
    selectedMonth, setSelectedMonth,
    selectedYear, setSelectedYear
  } = useContext(DateTimeContext);
  const { isShowing, toggle } = useModal();
  const { currentAppointments } = useContext(SchedulesContext);
  const [ appointmentsForTheDay, setAppointmentsForTheDay ] = useState([]);
  
  useEffect(() => {
    if (currentAppointments) {
      currentAppointments.forEach(appt => {
        if ((appt.date === day.date) && (appt.month === day.month+1) && (appt.year === day.year)) {
          setAppointmentsForTheDay(appointmentsForTheDay => [...appointmentsForTheDay, appt]);
        };
      });
    };
  }, []);

  if (!currentAppointments) return <></>
  return (
    <div
      className={`date ${day.date === currentDate.getDate() ? "today" : ""} ${day.date < currentDate.getDate() ? "past" : ""}`}
      style={ {gridColumn: day.date === 1 ? startingWeekday : ""} }
      onClick={toggle}
    >
      {day.date}
      {appointmentsForTheDay && appointmentsForTheDay.map(appt => (
        <div>
          {appt.title}
        </div>
      ))}
      <AppointmentModal key={new Date().getTime()} day={day} isShowing={isShowing} toggle={toggle} />
    </div>
  );
};

export default Day;