import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import RegisterForm from "./components/Forms/RegisterForm";
import LoginForm from "./components/Forms/LoginForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Episodes from "./components/Episodes";
import Locations from "./components/Locations";
import Characters from "./components/Characters";
import NotFoundPage from "./components/NotFoundPage";
import useLocalStorage from "./hooks/useLocalStorage";

export const Context = React.createContext(null);

function App() {
  const [users, setUsers] = useLocalStorage("users", []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("name");
  };

  useEffect(() => {
    if (localStorage.getItem("name")) {
      login();
    } else {
      logout();
    }
  }, []);
  
  let userName = "";
  let routes;
  if (localStorage.getItem("name")) {
    userName = JSON.parse(localStorage.getItem("name"));
    routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/episodes" component={Episodes} />
        <Route path="/locations" component={Locations} />
        <Route path="/characters" component={Characters} />
        {window.location.pathname === "/login" ||
        window.location.pathname === "/register" ? (
          <Redirect to="/" />
        ) : (
          <Route path="*" component={NotFoundPage} />
        )}
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    );
  }

  return (
    <Context.Provider
      value={{ users, setUsers, userName, isLoggedIn, login, logout }}
    >
      <Router>
        <div className="wrapper">
          <Header />
          {routes}
          <div className="push"></div>
        </div>
        <Footer />
      </Router>
    </Context.Provider>
  );
}

export default App;
