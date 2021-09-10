// library imports
import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
// component imports
import Month from '../calendar/Month';
// context imports
import { UserContext } from '../../contexts/UserContext';
import { DateTimeContext } from '../../contexts/DateTimeContext';
import { SchedulesContext } from '../../contexts/SchedulesContext';
// data imports
import { timesArr, getDefaultStartTime, getDefaultEndTime } from "../../data/timeIncrements";

const AppRouter = () => {
  const [ token, setToken ] = useState(false);
  const [ defaultStartTime, setDefaultStartTime ] = useState();
  const [ defaultEndTime, setDefaultEndTime ] = useState();
  const [ currentDate, setCurrentDate ] = useState();
  const [ selectedMonth, setSelectedMonth ] = useState();
  const [ selectedYear, setSelectedYear ] = useState();
  const [ currentAppointments, setCurrentAppointments ] = useState()

  useEffect(() => {
    setDefaultStartTime(getDefaultStartTime());
    setDefaultEndTime(getDefaultEndTime());
    let dateObj = new Date();
    setCurrentDate(dateObj);
    setSelectedMonth(dateObj.getMonth());
    setSelectedYear(dateObj.getFullYear());

    // grab schedules from backend
    fetch("https://prompt-backend.herokuapp.com/api/appointments/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(jsonRes => {
        setCurrentAppointments(jsonRes);
      })
  }, [])

  let userValues = { token, setToken };
  let dateTimeValues = {
    defaultStartTime, defaultEndTime,
    currentDate, setCurrentDate,
    selectedMonth, setSelectedMonth,
    selectedYear, setSelectedYear
  };
  let scheduleValues = { currentAppointments, setCurrentAppointments }

  return (
    <UserContext.Provider value={userValues}>
      <DateTimeContext.Provider value={dateTimeValues}>
        <SchedulesContext.Provider value={scheduleValues}>
          <Switch>
            <Route exact path="/" component={Month} />
          </Switch>
        </SchedulesContext.Provider>
      </DateTimeContext.Provider>
    </UserContext.Provider>
  );
};

export default AppRouter;