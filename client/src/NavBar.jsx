import React from 'react';
import USAFLogo from './assets/img/USAF_LOGO.svg';
import USSFLogo from './assets/img/USSF_LOGO.png';
import UserLogo from './assets/img/USER.svg';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg p-3 border border-0 ms-3" style={{backgroundColor: "var(--bs-content-bg)", borderBottom: "var(--bs-border-width) solid var(--bs-content-border-color)"}}>
        <div className="w-100 d-flex align-items-center" style={{height: "3.5rem"}}>

        <div className="d-flex justify-content-between collapse navbar-collapse" id="navbar-collapse-1">
            <div>
                <a className="navbar-brand" href="/">
                    <img src={USAFLogo} alt="Logo" height="43rem" className="d-inline-block align-text-top" />
                </a>
                <a className="navbar-brand" href="/">
                    <img src={USSFLogo} alt="Logo" height="43rem" className="d-inline-block align-text-top" />
                </a>
            </div>
            <div>
                <form role="search" className="d-flex align-items-center">
                    <input className="form-control me-2" type="search" placeholder="Search Knowledge Articles" aria-label="Search" style={{width: "20rem"}} />
                </form>
            </div>
            <div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-collapse-1" aria-controls="navbar-collapse-1" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            
                <div className="d-inline-flex align-text-top">

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">My Apps</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Helpful Links</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Ask A Question</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle material-symbols-outlined" style={{fontSize: "1rem"}} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">description</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <a className="navbar-brand" href="/">
                    <img src={UserLogo} alt="Logo" height="43rem" className="d-inline-block align-text-top" />
                </a>
            </div>
        </div>
    </div>
</nav>

  );
}

export default Navbar;