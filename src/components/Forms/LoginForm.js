import React, { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import classes from "./index.module.css";

import { Context } from "../../App";
import useLocalStorage from "../../hooks/useLocalStorage";

const LoginForm = () => {
  const context = useContext(Context);
  const users = context.users;
  const history = useHistory();

  const [name, setName] = useLocalStorage("name", "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (users.includes(name) && name.length !== 0) {
      context.login();
      history.push("/");
    } else {
      alert("There are no such user with this name!");
    }
  };

  return (
    <div className={classes.login}>
      <div className={classes["login-form"]}>
        <h2>Login Form</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
