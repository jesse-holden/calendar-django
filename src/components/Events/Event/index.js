import React from "react";
import "./index.css";

export default function Event({ item, onlistItemHover, editItem }) {
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
    </li>
  );
}
