import React from "react";
import Event from "./Event";

// This component renders the list of events below the calendar
export default function Events(props) {
  const { calendarList, activeDay, ...other } = props;
  const events = calendarList.filter(item => item.date === activeDay);
  return events.length ? (
    events.map(item => <Event key={item.id} item={item} {...other} />)
  ) : (
    <span className="text-center">No events</span>
  );
}
