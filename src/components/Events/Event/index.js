import React from "react";
import "./index.css";

export default function Event({
  item,
  activeListItem,
  onlistItemHover,
  editItem,
  handleDelete
}) {
  function handleDeleteMiddle(event, item) {
    // Stop event delete from opening "edit" modal
    event.stopPropagation();
    handleDelete(item);
  }

  return (
    <li
      onMouseMove={() => {
        onlistItemHover(item.id);
      }}
      onClick={() => editItem(item)}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <span className={"event-title mr-2 p-2 "} title={item.title}>
        <div className="event-time">
          {item.time
            .split(":")
            .slice(0, 2)
            .join(":")}
        </div>
        {" - "}
        {item.title}
      </span>
      {activeListItem === item.id ? (
        <span>
          <button
            onClick={event => handleDeleteMiddle(event, item)}
            className="btn btn-danger btn-delete"
          >
            Delete
          </button>
        </span>
      ) : null}
    </li>
  );
}
