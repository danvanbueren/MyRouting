import React from "react";

const Dropdown = ({ title }) => (
  <li className="nav-item dropdown">
    <a
      className="nav-link dropdown-toggle"
      href="/"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {title}
    </a>
  </li>
);

export default Dropdown;
