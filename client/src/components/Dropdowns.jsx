import React from "react";

const Dropdown = ({ title }) => (
  <li className="nav-item dropdown">
    <a
      className="nav-link dropdown-toggle"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      style={{ userSelect: "none" }}
    >
      {title}
    </a>
  </li>
);

export default Dropdown;
