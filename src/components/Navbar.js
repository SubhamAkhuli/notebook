import React from "react";


// NavLink/Link is used to navigate to different pages in the app without refreshing the page.But we use NavLink becasue also it is used to style the active link to get highlight in navbar.
import { NavLink, useNavigate } from "react-router-dom";


export default function Navbar(props) {
  const navigate =useNavigate();
  const handelLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
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
                {!localStorage.getItem('token') ?<NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>:<NavLink className="nav-link" aria-current="page" to="/home">Home</NavLink>}
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  {props.about}
                </NavLink>
              </li>
            </ul>
            {!localStorage.getItem('token') ? <form className="d-flex">
              <NavLink className="btn btn-primary mx-2" to="/login" >
                Login</NavLink>
              <NavLink className="btn btn-primary mx-2" to="/signup" >
                Signup</NavLink>
                </form> :<><NavLink className="btn btn-primary mx-2" to="/profile" >
                Profile</NavLink><button className="btn btn-primary" onClick={handelLogout} >
                  Logout</button></>}
          </div>
        </div>
      </nav>
    </div>
  );
}
