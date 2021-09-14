// library imports
import React, { useState, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import jwt_decode from 'jwt-decode';
// data import
import { timesArr } from "../../data/timeIncrements";
// context import
import { DateTimeContext } from '../../contexts/DateTimeContext';
import { UserContext } from '../../contexts/UserContext';
import { SchedulesContext } from "../../contexts/SchedulesContext";
// data import
import { months } from '../../data/calendar';

const ConfirmationModal = (props) => {
  const { day, isShowing, toggle, apptCheck, apptForTheDay } = props;
  const { token, setToken } = useContext(UserContext);
  const {
    defaultStartTime, defaultEndTime,
    currentDate, setCurrentDate,
    selectedMonth, setSelectedMonth,
    selectedYear, setSelectedYear
  } = useContext(DateTimeContext)
  const { currentAppointments, setCurrentAppointments } = useContext(SchedulesContext);
  const [ title, setTitle ] = useState(apptForTheDay ? apptForTheDay.title : "");
  const [ month, setMonth ] = useState(apptForTheDay ? apptForTheDay.month : day.month);
  const [ date, setDate ] = useState(apptForTheDay ? apptForTheDay.date : day.date);
  const [ year, setYear ] = useState(apptForTheDay ? apptForTheDay.year : day.year);
  const [ timeStart, setTimeStart ] = useState(apptForTheDay ? apptForTheDay.timeStart : defaultStartTime);
  const [ timeEnd, setTimeEnd ] = useState(apptForTheDay ? apptForTheDay.timeEnd : defaultEndTime);
  const [ userId, setUserId ] = useState(apptForTheDay ? apptForTheDay.userID : 0);
  const [ errors, setErrors ] = useState({
    titleInputError: "",
    timeInputError: ""
  });

  useEffect(() => {
    if (!token) {
      setUserId(0);
    } else setUserId(jwt_decode(token).id)
  }, [token]);

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
        if(!value.length) setErrors({...errors, titleInputError: "Title is a required field."});
        else setErrors({...errors, titleInputError: ""});
        setTitle(value);
        break;
      case 'timeStart':
        if (timesArr.indexOf(value) >= timesArr.indexOf(timeEnd)) setErrors({...errors, timeInputError: "Start time can not be greater than end time."});
        else {
          setErrors({...errors, timeInputError: ""});
          setTimeEnd(value);
        }
        break;
      case 'timeEnd':
        if (timesArr.indexOf(value) <= timesArr.indexOf(timeStart)) setErrors({...errors, timeInputError: "End time must be greater than start time."});
        else {
          setErrors({...errors, timeInputError: ""});
          setTimeEnd(value);
        }
        break;
      default:
        break;
    };
  };

  const handleSubmit = (event) => {
    // add validation check to see if there are any error messages first
    event.preventDefault();

    if (errors.titleInputError || errors.timeInputError) alert("Please fill in the required fields.");
    else {
      // make sure there are truly no errors if clicked submit instantly
      if (!title) setErrors({...errors, titleInputError: "Title is a required field."});
      else {
        const newAppointmentObj = {
          title: title,
          month: month + 1,
          date: date,
          year: year,
          timeStart: timeStart,
          timeEnd: timeEnd,
          userID: userId
        };
  
        fetch("https://prompt-backend.herokuapp.com/api/appointments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "token": token
          },
          body: JSON.stringify(newAppointmentObj)
        })
        .then(res => res.json())
        .then(jsonRes => {
          setCurrentAppointments([...currentAppointments, jsonRes]);
        })
        .catch(err => alert("An error has occured. Please try again later."))
      };
    }
  }

  const handleDelete = (event) => {
    event.preventDefault();

    fetch("https://prompt-backend.herokuapp.com/api/appointments/" + apptForTheDay.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "token": token
      }
    })
    .then(res => res.json())
    .then(jsonRes => {
      setCurrentAppointments(currentAppointments.filter(appt => appt.id !== apptForTheDay.id));
    })
  }

  const handleUpdate = (event) => {
    event.preventDefault();

    if (!errors.titleInputError || !errors.timeInputError) alert("Please fill in the required fields.");
    else {
      const updateAppointmentObj = {
        title: title,
        month: month,
        date: date,
        year: year,
        timeStart: timeStart,
        timeEnd: timeEnd,
        userID: userId
      };

      fetch("https://prompt-backend.herokuapp.com/api/appointments/" + apptForTheDay.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "token": token
        },
        body: JSON.stringify(updateAppointmentObj)
      })
      .then(res => res.json())
      .then(jsonRes => {
        let updatedAppts = currentAppointments.map(appt => {
          if (appt.id === jsonRes.id) return {...jsonRes, title: title, timeStart: timeStart, timeEnd: timeEnd};
          return appt;
        })
        setCurrentAppointments(updatedAppts)
      })
      .catch(err => alert("An error has occured. Please try again later."))
    };
  }

  if (!isShowing) return null;
  return createPortal(
    <div className="modal-overlay" onClick={toggle}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-top">
          <span className="modal-title">{apptCheck ? "Viewing" : "Create"} Appointment</span>
          <div className="modal-close" onClick={toggle}>x</div>
        </div>

        <div className="modal-body">
          <input id="appt-title" name="title" type="text" placeholder="Add title" value={title} onChange={handleChange} />
          {errors.titleInputError ? <span className="modal-error-message">{errors.titleInputError}</span> : <></>}

          <div>
            {months[day.month]} {day.date}, {day.year}
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
          {errors.timeInputError ? <span className="modal-error-message">{errors.timeInputError}</span> : <></>}
        </div>
        
        <div className = "modal-bottom">
          {!apptCheck ?
            <button className="modal-create" onClick={handleSubmit}>Create</button> :
            <>
              <button className="modal-delete" onClick={handleDelete}>Delete</button>
              <button className="modal-update" onClick={handleUpdate}>Update</button>
            </>
          }
          <button className="modal-cancel" onClick={toggle}>Cancel</button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ConfirmationModal;