import React from "react";


// NavLink/Link is used to navigate to different pages in the app without refreshing the page.But we use NavLink becasue also it is used to style the active link to get highlight in navbar.
import { NavLink } from "react-router-dom";


export default function Navbar(props) {
  return (
    <div>
      {/* navbar component */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            {props.title}
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  {props.about}
                </NavLink>
              </li>
            </ul>
            <form className="d-flex">
                <NavLink className="btn btn-primary mx-2" to="/login" role="button">
                  Login</NavLink>
                  <NavLink className="btn btn-primary mx-2" to="/signup" role="button">
                  Signup</NavLink>
              </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
