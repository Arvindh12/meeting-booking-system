import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

function PageRedirect({ Redirect ,setCurrentUser}) {
    setCurrentUser(null)
  return (
    <div className = "text-center mt-5">
      You are signed out ... Want to {" "}
      <NavLink to="/login" activeClassName="text-success">
        Login
      </NavLink>
    </div>
  );
}

export default PageRedirect;
