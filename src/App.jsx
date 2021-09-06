// library imports
import React from "react";
// component imports
import Month from "./components/calendar/Month";
// styles
import "./index.css"

const App = () => {
  return (
    <div>
      <h1>Prompt Calendar</h1>
      <Month />
    </div>
  );
}

export default App;