// library imports
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
// data import
import { timesArr, getDefaultStartingTime, getDefaultEndTime } from "../../data/timeIncrements";

const ConfirmationModal = (props) => {
  const { day, isShowing, toggle } = props;
  const defaultStartingTime = getDefaultStartingTime();
  const defaultEndTime = getDefaultEndTime();

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

  if (!isShowing) return null;
  return createPortal(
    <div className="modal-overlay" onClick={toggle}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-top">
          <span className="modal-title">Create Appointment</span>
          <div className="modal-close" onClick={toggle}>x</div>
        </div>

        <div className="modal-body">
          <input id="appt-title" type="text" placeholder="Add title" />

          <div>
            {day.month} {day.date}, {day.year}
          </div>
          
          <div className="date-times">
            <span>From </span>
            <select>
              {timesArr.map((time, index) => (
                <option key={new Date().getTime()+index} value={time} defaultValue={defaultStartingTime === time}>{time}</option>
              ))}
            </select>
            <span> To </span>
            <select>
              {timesArr.map((time, index) => (
                <option key={new Date().getTime()+index} value={time} defaultValue={defaultEndTime === time}>{time}</option>
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