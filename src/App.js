import React, { useState, useEffect, createContext } from "react";
import { Mesg, FailedMesg } from "./API/APIMessage";
import { LoadData } from "./API";
import logo from "./logo.svg";
import "./App.css";

import { useHistory } from "react-router";
import Newarticle from "./pages/Article/newarticle";
import "react-progress-2/main.css";
import Sidebar from "./pages/Sidebar";
import Dashboard from "./pages/Dashboard";
import Articles from "./pages/Article";
import Booking from "./pages/Booking";
import Events from "./pages/Events";
import Customers from "./pages/Customers";
import Admins from "./pages/Admins";
import Resources from "./pages/Resource";
import FilUploader from "./pages/FileUploader";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CreateEvent from "./pages/Events/CreateEvent";
import Home from "./pages/Home";
import Bookingdetalis from "./pages/Booking/bookingdetalis";
import booking from "./pages/Booking/booking";
import Editarticle from "./pages/Article/editarticle";
import Event from "./pages/Events/event";
import EditeEvent from "./pages/Events/editEvent";

import { HashRouter as Router, Route, Switch } from "react-router-dom";

function App(props) {
  const Admin = createContext();
  const [admins, setadmins] = useState([]);
  const [spaces, setspaces] = useState([]);
  const [userId, setuserId] = useState("");
  const history = useHistory();

  const getAdmins = () => {};
  const getSpace = () => {
    LoadData(
      "spaces",
      (err, data) => {
        setspaces(data.data);
        setuserId(data.user.id);
        if (err) {
          Mesg(err);
        }
      },
      (err) => {
        FailedMesg(err, "Something worng happend !");
      }
    );
  };
  useEffect(() => {
    LoadData(
      "Admins",
      (err, data) => {
        setadmins(data.data);
      },
      (err) => {
        FailedMesg(err, "Something worng happend !");
      }
    );
    getSpace();
    if (
      localStorage.getItem("station_token") != undefined &&
      localStorage.getItem("station_token") != ""
    ) {
    } else {
      //history.push("/login");
      //.log(props.history);
    }
  }, []);

  return (
    <div>
      {/* <Admin.Provider value={{ admins: admins }}> */}
      {/* <Router> */}
      <Switch>
        {/* <Route path="/login" component={Login} exact /> */}
        <Route
          path="/"
          exact
          render={(props) => <Dashboard {...props} admins={admins} />}
        />
        <Route
          path="/profile"
          // component={Profile}
          render={(props) => <Profile {...props} admins={admins} id={userId} />}
          exact
        />
        <Route path="/createEvent/:id" component={CreateEvent} exact />
        <Route path="/createarticle" component={Newarticle} exact />
        <Route
          path="/articles"
          // component={Articles}
          render={(props) => <Articles {...props} admins={admins} />}
          exact
        />
        <Route
          path="/booking"
          render={(props) => <Booking {...props} admins={admins} id={userId} />}
          exact
        />
        <Route path="/bookingdetalis/:id" component={booking} exact />
        <Route path="/articles/:id" component={Editarticle} exact />
        {/* <Route path="/bookingdetalis" component={booking} exact /> */}
        <Route path="/home" component={Home} exact />
        <Route
          path="/events"
          exact
          render={(props) => <Events {...props} admins={admins} />}
        />{" "}
        <Route
          path="/event/:id"
          exact
          render={(props) => <Event {...props} admins={admins} />}
        />{" "}
        <Route
          path="/editevent/:id"
          exact
          render={(props) => <EditeEvent {...props} admins={admins} />}
        />
        <Route
          path="/customers"
          // component={Customers}
          render={(props) => <Customers {...props} id={userId} />}
          exact
        />
        <Route
          path="/admins"
          render={(props) => <Admins {...props} admins={admins} />}
          exact
        />
        <Route
          path="/resources"
          exact
          render={(props) => <Resources {...props} admins={admins} />}
        />
        <Route
          path="/fileUploader"
          exact
          render={(props) => <FilUploader {...props} admins={admins} />}
        />
      </Switch>
      {/* </Router> */}
      {/* </Admin.Provider> */}
    </div>
  );
}

export default App;
