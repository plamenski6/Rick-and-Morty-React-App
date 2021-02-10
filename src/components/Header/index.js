import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";

import classes from "./index.module.css";

import { Context } from "../../App";

const Header = () => {
  const context = useContext(Context);

  return (
    <div className={classes.header}>
      <Link to="/" className={classes["logo-link"]}>
        <h2>Rick&Morty</h2>
      </Link>
      <div className={classes.links}>
        {!context.isLoggedIn ? (
          <>
            <div className={classes.hide}>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
            <DropdownButton
              className={classes.dropdownOut}
              id="dropdown-basic-button"
              variant="info"
              title="Menu"
              size="sm"
            >
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </DropdownButton>
          </>
        ) : (
          <>
            <div className={classes.hide}>
              <Link to="/episodes">Episodes</Link>
              <Link to="/locations">Locations</Link>
              <Link to="/characters">Characters</Link>
              <Link to="/">
                <span onClick={context.logout}>
                  Logout ({context.userName})
                </span>
              </Link>
            </div>
            <DropdownButton
              className={classes.dropdownIn}
              id="dropdown-basic-button"
              variant="info"
              title="Menu"
              size="sm"
            >
              <Dropdown.Item href="/episodes">Episodes</Dropdown.Item>
              <Dropdown.Item href="/locations">Locations</Dropdown.Item>
              <Dropdown.Item href="/characters">Characters</Dropdown.Item>
              <Dropdown.Item href="/">
                <span onClick={context.logout}>
                  Logout ({context.userName})
                </span>
              </Dropdown.Item>
            </DropdownButton>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
