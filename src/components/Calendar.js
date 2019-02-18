import React from "react";
import { pad } from "../helpers";
import "./Calendar.css";

export default function Calendar(props) {
  const renderWeekDay = (i, eventsToday) => {
    return (
      <div
        key={i}
        className={
          props.activeDay === `2019-02-${pad(i, 2)}` ? "day active" : "day"
        }
        onClick={() => {
          props.onDayClick(i);
        }}
      >
        <span className="day-label">{i}</span>
        {eventsToday ? (
          <span className="event-count-label">{eventsToday}</span>
        ) : null}
      </div>
    );
  };
  const renderCalendarDays = () => {
    const days = 28;
    let blankDays = 5;
    const month = [];
    const eventCount = {};
    props.calendarList.map(
      event =>
        (eventCount[event.date] = eventCount[event.date]
          ? eventCount[event.date] + 1
          : 1)
    );
    let i = 1;

    while (i <= days) {
      let week = [];
      let j = 0;
      while (i <= days) {
        if (j > 6) break;
        while (blankDays > 0) {
          week.push(
            <div key={`blank-${j}`} className="blank-day">
              <span className="day-label empty" />
            </div>
          );
          blankDays--;
          j++;
        }
        const eventsToday = eventCount[`2019-02-${pad(i, 2)}`];
        week.push(renderWeekDay(i, eventsToday));
        i++;
        j++;

        if (i > days) {
          week.push(
            <div key={"blank-last"} className="blank-day">
              <span className="day-label empty" />
            </div>
          );
        }
      }
      month.push(
        <div key={i} className="week">
          {week}
        </div>
      );
    }

    return month;
  };

  return (
    <React.Fragment>
      <div className="row justify-content-center align-items-center">
        <i className="fas p-2 m-2 arrow-button fa-angle-double-left" />
        <h2>February 2019</h2>
        <i className="fas p-2 m-2 arrow-button fa-angle-double-right" />
      </div>
      <div className="row text-center">
        <div className="month">
          <div className="week">
            <div className="week-day">Sunday</div>
            <div className="week-day">Monday</div>
            <div className="week-day">Tuesday</div>
            <div className="week-day">Wednesday</div>
            <div className="week-day">Thursday</div>
            <div className="week-day">Friday</div>
            <div className="week-day">Saturday</div>
            <div className="week-day week-day-short">S</div>
            <div className="week-day week-day-short">M</div>
            <div className="week-day week-day-short">T</div>
            <div className="week-day week-day-short">W</div>
            <div className="week-day week-day-short">T</div>
            <div className="week-day week-day-short">F</div>
            <div className="week-day week-day-short">S</div>
          </div>
          {renderCalendarDays()}
        </div>
      </div>
    </React.Fragment>
  );
}
