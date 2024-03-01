import React from "react";

const SearchBar = () => (
  <form role="search" className="d-flex align-items-center">
    <input
      className="form-control me-2"
      type="search"
      placeholder="Search Knowledge Articles"
      aria-label="Search"
      style={{ width: "20rem" }}
    />
  </form>
);
export default SearchBar;
