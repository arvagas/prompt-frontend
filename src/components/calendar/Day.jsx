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
  const [ appointmentForTheDay, setAppointmentForTheDay ] = useState(null);
  const [ hasAppointment, setHasAppointment ] = useState(false);
  
  useEffect(() => {
    if (currentAppointments) {
      currentAppointments.forEach(appt => {
        if ((appt.date === day.date) && (appt.month === day.month+1) && (appt.year === day.year)) {
          setAppointmentForTheDay(appt);
          setHasAppointment(true);
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
      {appointmentForTheDay ? (
        <div className="with-appt">
          <span className="with-appt-title">{appointmentForTheDay.title}</span><br/>
          <span className="with-appt-time">{appointmentForTheDay.timeStart} - {appointmentForTheDay.timeEnd}</span>
        </div>
      ) : ( <></> )}
      <AppointmentModal key={new Date().getTime()} day={day} isShowing={isShowing} toggle={toggle} apptCheck={hasAppointment} apptForTheDay={appointmentForTheDay} />
    </div>
  );
};

export default Day;