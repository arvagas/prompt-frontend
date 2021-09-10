// library imports
import React from "react";
import { createPortal } from "react-dom";

const ConfirmationModal = (props) => {
  const { day, isShowing, toggle } = props;
  const timesBase = ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
  const timesAppend = [":00", ":15", ":30", ":45"];
  let timesBaseCounter = 0;
  let timesAppendCounter = 0;
  const timesArr = Array.from({length: 96}, (_, index) => {
    let timesJoin = "";

    timesJoin += timesBase[timesBaseCounter];

    timesJoin += timesAppend[timesAppendCounter];
    timesAppendCounter++;

    if (timesAppendCounter === 4) {
      timesAppendCounter = 0;
      timesBaseCounter++;
    }

    if (index < 48) timesJoin += "am";
    else timesJoin += "pm";

    return timesJoin;
  });

  if (!isShowing) return null;
  return createPortal(
    <>
      <div className="modal-overlay" />
      <div className="modal-wrapper" onClick={(event) => event.stopPropagation()}>
        <div className="modal">
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
                  <option key={new Date().getTime()+index} value={time}>{time}</option>
                ))}
              </select>
              <span> To </span>
              <select>
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
      </div>
    </>,
    document.getElementById("modal-root")
  );
};

export default ConfirmationModal;