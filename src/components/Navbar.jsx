import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ currentUser }) {
  return (
    <div className="container-fluid pt-1">
      <div className="row">
        <div className="col-4 text-center">
          {currentUser === null ? (
            <NavLink to="/login" activeClassName="text-success">
              Login
            </NavLink>
          ) : (
            <NavLink to="/logout" activeClassName="text-success">
              Logout
            </NavLink>
          )}
        </div>
        <div className="col-4 text-center">
          <NavLink to="/book" activeClassName="text-success">
            Book room
          </NavLink>
        </div>
        <div className="col-4 text-center">
          <NavLink to="/view" activeClassName="text-success">
            View Bookings
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
