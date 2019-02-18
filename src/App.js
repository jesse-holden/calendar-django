import React, { Component } from "react";
import Calendar from "./components/Calendar";
import Modal from "./components/Modal";
import axios from "axios";
import { pad } from "./helpers";

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
      activeDay: "2019-02-17",
      activeListItem: null
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = async () => {
    try {
      const res = await axios.get("/api/calendar/");
      this.setState({ calendarList: res.data });
    } catch (err) {
      console.log(err);
    }
  };
  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = async item => {
    this.toggle();
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
  handleDelete = async item => {
    await axios.delete(`/api/calendar/${item.id}`);
    this.refreshList();
  };
  createItem = () => {
    const { activeDay } = this.state;
    const item = {
      title: "",
      date: activeDay ? activeDay : "2019-02-17",
      time: "12:00:00"
    };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };
  onDayClick = day => {
    const paddedDay = pad(day, 2);
    this.setState({ activeDay: `2019-02-${paddedDay}` });
  };
  onlistItemHover = id => {
    this.setState({
      activeListItem: id
    });
  };
  renderItemButtons = item => {
    return (
      <span>
        <button
          onClick={() => this.editItem(item)}
          className="btn btn-secondary mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => this.handleDelete(item)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </span>
    );
  };
  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          title
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          date
        </span>
      </div>
    );
  };
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.calendarList.filter(
      item => item.completed === viewCompleted
    );
    const events = newItems.filter(item => item.date === this.state.activeDay);
    return events.length ? (
      events.map(item => (
        <li
          key={item.id}
          onMouseMove={() => {
            this.onlistItemHover(item.id);
          }}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span
            className={`todo-title mr-2 p-2 ${
              this.state.viewCompleted ? "completed-todo" : ""
            }`}
            title={item.title}
          >
            {item.title}
          </span>
          {this.state.activeListItem === item.id
            ? this.renderItemButtons(item)
            : null}
        </li>
      ))
    ) : (
      <span className="text-center">No events</span>
    );
  };
  render() {
    return (
      <main className="content container-fluid">
        {/* <h1 className="text-white text-uppercase text-center my-2">
          Calendar app
        </h1> */}
        <div className="row pt-2">
          <div className="col-lg-8 col-md-11 col-12 mx-auto p-0 mb-2">
            <div className="card p-3">
              <Calendar
                activeDay={this.state.activeDay}
                onDayClick={this.onDayClick}
                calendarList={this.state.calendarList}
              />
              {/* {this.renderTabList()} */}
              <ul
                className="list-group list-group-flush mt-3"
                onMouseLeave={() => {
                  this.onlistItemHover(null);
                }}
              >
                <hr />
                {this.renderItems()}
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
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default App;