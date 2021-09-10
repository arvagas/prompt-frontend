// library imports
import React, { useState, useContext } from "react";
import { createPortal } from "react-dom";
// data import
import { timesArr } from "../../data/timeIncrements";
// context import
import { DateTimeContext } from '../../contexts/DateTimeContext';
import { UserContext } from '../../contexts/UserContext';

const ConfirmationModal = (props) => {
  const { day, isShowing, toggle } = props;
  const {
    defaultStartTime, defaultEndTime,
    currentDate, setCurrentDate,
    selectedMonth, setSelectedMonth,
    selectedYear, setSelectedYear
  } = useContext(DateTimeContext)
  const [ title, setTitle ] = useState("");
  const [ month, setMonth ] = useState(selectedMonth);
  const [ date, setDate ] = useState(currentDate.getDate());
  const [ year, setYear ] = useState(selectedYear);
  const [ timeStart, setTimeStart ] = useState(defaultStartTime);
  const [ timeEnd, setTimeEnd ] = useState(defaultEndTime);
  const [ userId, setUserId ] = useState(0);

  // useEffect(() => {
  //   if (isShowing) {
  //     const closeOnEscapeKeyDown = (event) => {
  //       if (((event.charCode || event.keyCode) === 27)`` || (event.key === "Escape")) {
  //         console.log("running")
  //         toggle;
  //       }
  //     }
        
  //     window.addEventListener("keydown", closeOnEscapeKeyDown)
      
  //     return () => document.body.removeEventListener("keydown", closeOnEscapeKeyDown)
  //   }
  // }, []);

  const handleChange = (event) => {
    let { name, value } = event.target

    // data validation, then update values
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'timeStart':
        setTimeStart(value);
        break;
      case 'timeEnd':
        setTimeEnd(value);
        break;
      default:
        break;
    };
  };

  if (!isShowing) return null;
  return createPortal(
    <div className="modal-overlay" onClick={toggle}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-top">
          <span className="modal-title">Create Appointment</span>
          <div className="modal-close" onClick={toggle}>x</div>
        </div>

        <div className="modal-body">
          <input id="appt-title" name="title" type="text" placeholder="Add title" onChange={handleChange} />

          <div>
            {day.month} {day.date}, {day.year}
          </div>
          
          <div className="date-times">
            <span>From </span>
            <select name="timeStart" value={timeStart} onChange={handleChange}>
              {timesArr.map((time, index) => (
                <option key={new Date().getTime()+index} value={time}>{time}</option>
              ))}
            </select>
            <span> To </span>
            <select name="timeEnd" value={timeEnd} onChange={handleChange}>
              {timesArr.map((time, index) => (
                <option key={new Date().getTime()+index} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className = "modal-bottom">
          <button className="modal-create">Create</button>
          <button className="modal-cancel" onClick={toggle}>Cancel</button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ConfirmationModal;