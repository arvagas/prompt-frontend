// library imports
import React from 'react';

const Day = ( props ) => {
  let { day, placement } = props;

  return (
    <div
      style={ {gridColumn: placement === 0 ? "4" : ""} }
    >
      {day}
    </div>
  )
}

export default Day