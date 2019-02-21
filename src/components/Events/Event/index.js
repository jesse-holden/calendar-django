import React from "react";
import "./index.css";

export default function Event({
  item,
  activeListItem,
  onlistItemHover,
  editItem,
  handleDelete
}) {
  const renderItemButtons = item => (
    <span>
      <button onClick={() => editItem(item)} className="btn btn-secondary mr-2">
        Edit
      </button>
      <button onClick={() => handleDelete(item)} className="btn btn-danger">
        Delete
      </button>
    </span>
  );

  return (
    <li
      onMouseMove={() => {
        onlistItemHover(item.id);
      }}
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
      {activeListItem === item.id ? renderItemButtons(item) : null}
    </li>
  );
}
