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
      className="navbar navbar-expand-md p-3 border border-0 ms-3"
      style={{
        backgroundColor: "var(--bs-content-bg)",
        borderBottom:
          "var(--bs-border-width) solid var(--bs-content-border-color)",
      }}
    >
      <div
        className="w-100 d-flex align-items-center justify-content-between"
        style={{ height: "3.5rem" }}
      >
        <div className="d-flex">
          <Logo
            src={USAFLogo}
            alt="USAF Logo"
            style={{ maxWidth: "50px", marginRight: "10px" }}
          />
        </div>
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
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbar-collapse-1"
        >
          <div className="row">
            <div className="col">
              <SearchBar
                style={{ flex: 1, maxWidth: "300px", margin: "0 10px" }}
              />
            </div>
            <div className="col">
              <div className="d-inline-flex align-text-top">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <Dropdown title="My Apps" />
                  <Dropdown title="Helpful Links" />
                  <Dropdown title="Ask A Question" />
                  <Dropdown title="description" />
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Logo src={UserLogo} alt="User Logo" style={{ maxWidth: "50px" }} />
      </div>
    </nav>
  );
}

export default Navbar;
