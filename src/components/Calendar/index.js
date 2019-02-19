import React from "react";
import { pad } from "../../util";
import "./index.css";

const shortDaysOfWeek = [null, "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WeekDay = props => (
  <div
    className={
      props.activeDay ===
      `${props.activeYear}-${props.activeMonth}-${pad(props.i, 2)}`
        ? "day active"
        : "day"
    }
    onClick={() => {
      props.onDayClick(props.i);
    }}
  >
    <span className="day-label">{props.i}</span>
    {props.eventsToday ? (
      <span className="event-count-label">{props.eventsToday}</span>
    ) : null}
  </div>
);

export default function Calendar(props) {
  const renderCalendarDays = () => {
    let numDaysCurMonth = new Date(props.activeYear, props.activeMonth, 0);
    let numSpaceDays = new Date(props.activeYear, props.activeMonth - 1, 0);
    let days = numDaysCurMonth.getDate();
    let blankDays = shortDaysOfWeek.indexOf(
      numSpaceDays.toString().split(" ")[0]
    );
    blankDays = blankDays > 6 ? 0 : blankDays;
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
        const eventsToday =
          eventCount[`${props.activeYear}-${props.activeMonth}-${pad(i, 2)}`];
        week.push(
          <WeekDay
            key={i}
            i={i}
            eventsToday={eventsToday}
            activeDay={props.activeDay}
            activeMonth={props.activeMonth}
            activeYear={props.activeYear}
            onDayClick={props.onDayClick}
          />
        );
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
        <i
          className="fas p-2 m-2 arrow-button fa-angle-double-left"
          onClick={props.prevMonthButton}
        />
        <h2>
          {props.currentMonth} {props.activeYear}
        </h2>
        <i
          className="fas p-2 m-2 arrow-button fa-angle-double-right"
          onClick={props.nextMonthButton}
        />
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
