import React from "react";

const Dropdown = ({ title }) => (
  <li className="nav-item dropdown">
    <a
      className="nav-link dropdown-toggle"
      href="#"
      id="navbarDropdown"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      style={{ userSelect: "none", padding: "10px 15px" }}
    >
      {title}
    </a>
  </li>
);

export default Dropdown;
