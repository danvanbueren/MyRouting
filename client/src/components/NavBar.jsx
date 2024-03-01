import React from "react";
import USAFLogo from "../assets/img/USAF_LOGO.svg";
import USSFLogo from "../assets/img/USSF_LOGO.png";
import UserLogo from "../assets/img/USER.svg";
import Logo from "./Logo";
import SearchBar from "./Searchbar.jsx";
import Dropdown from "./Dropdowns";
function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg p-3 border border-0 ms-3"
      style={{
        backgroundColor: "var(--bs-content-bg)",
        borderBottom:
          "var(--bs-border-width) solid var(--bs-content-border-color)",
      }}
    >
      <div
        className="w-100 d-flex align-items-center"
        style={{ height: "3.5rem" }}
      >
        <div
          className="d-flex justify-content-between collapse navbar-collapse"
          id="navbar-collapse-1"
        >
          <div>
            <Logo src={USAFLogo} alt="USAF Logo" />
            <Logo src={USSFLogo} alt="USSF Logo" />
          </div>
          <SearchBar />
          <div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbar-collapse-1"
              aria-controls="navbar-collapse-1"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="d-inline-flex align-text-top">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <Dropdown title="My Apps" />
                <Dropdown title="Helpful Links" />
                <Dropdown title="Ask A Question" />
                <Dropdown title="description" />
              </ul>
            </div>
          </div>
          <Logo src={UserLogo} alt="User Logo" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
