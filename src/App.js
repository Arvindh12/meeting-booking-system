import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import Bookroom from "./components/Bookroom";
import ViewBookings from "./components/ViewBookings";
import PageRedirect from "./components/PageRedirect";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <div className="App">
      <Router>
        <Navbar currentUser={currentUser} />
        <Switch>
          <Route path="/login" exact>
            <Login setCurrentUser={setCurrentUser} />
          </Route>
          <Route path="/book" exact>
          {currentUser === null ? (
              <Redirect to="/logout" />
            ) : (
              <Bookroom currentUser={currentUser} />
            )}
          </Route>
          <Route path="/view" exact>
            {currentUser === null ? (
              <Redirect to="/logout" />
            ) : (
              <ViewBookings currentUser={currentUser} />
            )}
          </Route>
          <Route path="/logout" exact>
            <PageRedirect setCurrentUser={setCurrentUser} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
