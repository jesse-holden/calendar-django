import React, { Component } from "react";
import Calendar from "./Calendar";
import Modal from "./Modal";
import axios from "axios";
import { pad, timeStringToSeconds, monthList } from "../util";
import Events from "./Events";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activeItem: {
        title: "",
        date: "",
        time: ""
      },
      calendarList: [],
      activeDay: null,
      activeMonth: null,
      activeYear: null,
      activeListItem: null
    };
  }

  componentDidMount() {
    const newDate = new Date().toString().split(" ");
    const today = `${newDate[3]}-${pad(
      monthList.short.indexOf(newDate[1]),
      2
    )}-${newDate[2]}`;
    this.setState({
      activeDay: today,
      activeMonth: monthList.short.indexOf(newDate[1]),
      activeYear: parseInt(newDate[3])
    });
    this.refreshList();
  }

  // Update list of all events from API
  refreshList = async () => {
    try {
      const res = await axios.get("/api/calendar/");
      this.setState({
        calendarList: res.data.sort(
          (a, b) => timeStringToSeconds(a.time) - timeStringToSeconds(b.time)
        )
      });
    } catch (err) {
      console.log(err);
    }
  };

  // User presses "next" or "prev" month buttons
  handleChangeMonth = interval => {
    const { activeMonth, activeYear } = this.state;
    let newMonth = activeMonth + interval;
    let newYear = activeYear;
    while (newMonth > 12) {
      newMonth -= 12;
      newYear++;
    }
    while (newMonth < 1) {
      newMonth += 12;
      newYear--;
    }
    this.setState({
      activeMonth: newMonth,
      activeDay: `${newYear}-${pad(newMonth, 2)}-01`,
      activeYear: newYear
    });
  };

  // User opens or closes the modal window
  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  // User clicks a day "cell" on the calendar
  handleDayClick = day => {
    const { activeMonth, activeYear } = this.state;
    const paddedDay = pad(day, 2);
    const paddedMonth = pad(activeMonth, 2);
    this.setState({ activeDay: `${activeYear}-${paddedMonth}-${paddedDay}` });
  };

  // User moves cursor over an event in the event list
  onlistItemHover = id => {
    this.setState({
      activeListItem: id
    });
  };

  // User clicks "add event" button
  createItem = () => {
    const { activeDay } = this.state;
    const item = {
      title: "",
      date: activeDay ? activeDay : "2019-01-01",
      time: "12:00:00"
    };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  // User creates a new event
  handleSubmit = async item => {
    this.toggleModal();
    try {
      if (item.id) {
        await axios.put(`/api/calendar/${item.id}/`, item);
        this.refreshList();
        return;
      }
      await axios.post("/api/calendar/", item);
      this.refreshList();
    } catch (err) {
      console.log(err);
    }
  };

  // User deletes an event
  handleDelete = async item => {
    await axios.delete(`/api/calendar/${item.id}/`);
    this.refreshList();
  };

  // User edits an existing event
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  render() {
    return (
      <main className="content container-fluid">
        <h1 className="text-white text-uppercase text-center my-2">
          Calendar app
        </h1>
        <div className="row pt-2">
          <div className="col-lg-8 col-md-11 col-12 mx-auto p-0 mb-2">
            <div className="card p-3">
              <Calendar
                activeDay={this.state.activeDay}
                activeMonth={pad(this.state.activeMonth, 2)}
                activeYear={this.state.activeYear}
                calendarList={this.state.calendarList}
                handleChangeMonth={this.handleChangeMonth}
                currentMonth={monthList.long[this.state.activeMonth]}
                handleDayClick={this.handleDayClick}
              />
              <ul
                className="list-group list-group-flush mt-3"
                onMouseLeave={() => {
                  this.onlistItemHover(null);
                }}
              >
                <hr />
                <Events
                  activeDay={this.state.activeDay}
                  activeListItem={this.state.activeListItem}
                  calendarList={this.state.calendarList}
                  editItem={this.editItem}
                  handleDelete={this.handleDelete}
                  onlistItemHover={this.onlistItemHover}
                />
              </ul>

              <div className="ml-auto py-3">
                <button onClick={this.createItem} className="btn btn-primary">
                  Add Event
                </button>
              </div>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            handleSubmit={this.handleSubmit}
            toggleModal={this.toggleModal}
          />
        ) : null}
      </main>
    );
  }
}
export default App;
