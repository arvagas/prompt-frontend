// library imports
import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
// component imports
import Month from '../calendar/Month';
// context imports
import { UserContext } from '../../contexts/UserContext';
import { DateTimeContext } from '../../contexts/DateTimeContext';
// data imports
import { timesArr, getDefaultStartTime, getDefaultEndTime } from "../../data/timeIncrements";

const AppRouter = () => {
  const [ token, setToken ] = useState(false);
  const [ defaultStartTime, setDefaultStartTime ] = useState();
  const [ defaultEndTime, setDefaultEndTime ] = useState();
  const [ currentDate, setCurrentDate ] = useState();
  const [ selectedMonth, setSelectedMonth ] = useState();
  const [ selectedYear, setSelectedYear ] = useState();

  useEffect(() => {
    setDefaultStartTime(getDefaultStartTime());
    setDefaultEndTime(getDefaultEndTime());
    let dateObj = new Date();
    setCurrentDate(dateObj);
    setSelectedMonth(dateObj.getMonth());
    setSelectedYear(dateObj.getFullYear());
  }, [])

  let userValues = { token, setToken };
  let dateTimeValues = { defaultStartTime, defaultEndTime,
                        currentDate, setCurrentDate,
                        selectedMonth, setSelectedMonth,
                        selectedYear, setSelectedYear };

  return (
    <UserContext.Provider value={userValues}>
      <DateTimeContext.Provider value={dateTimeValues}>
        <Switch>
          <Route exact path="/" component={Month} />
        </Switch>
      </DateTimeContext.Provider>
    </UserContext.Provider>
  );
};

export default AppRouter;