import React from "react";

const Logo = ({ src, alt }) => (
  <a className="navbar-brand" href="/">
    <img
      src={src}
      alt={alt}
      height="43rem"
      className="d-inline-block align-text-top"
    />
  </a>
);
export default Logo;
