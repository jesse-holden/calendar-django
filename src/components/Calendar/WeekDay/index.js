import React from "react";
import { pad } from "../../../util";

// Component for rendering day cells on calendar with correct class names
export const WeekDay = props => (
  <div
    className={
      props.activeDay ===
      `${props.activeYear}-${props.activeMonth}-${pad(props.i, 2)}`
        ? "day active"
        : "day"
    }
    onClick={() => {
      props.handleDayClick(props.i);
    }}
  >
    <span className="day-label">{props.i}</span>
    {props.eventsToday ? (
      <span className="event-count-label">{props.eventsToday}</span>
    ) : null}
  </div>
);

export default WeekDay;
