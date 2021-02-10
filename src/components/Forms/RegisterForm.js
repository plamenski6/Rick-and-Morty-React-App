import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import classes from "./index.module.css";

import { Context } from "../../App";

const RegisterForm = () => {
  const context = useContext(Context);
  const users = context.users;
  const setUsers = context.setUsers;
  const history = useHistory();

  const [name, setName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const regex = /^[a-zA-Z]+$/gim;
    if (name !== "" && name.match(regex)) {
      if (!users.includes(name)) {
        setUsers((users) => [...users, name]);
        history.push("/login");
      } else {
        alert("The name is already used!");
      }
    } else {
      alert("Name must be filled out only with letters!");
    }
  };

  return (
    <div className={classes.register}>
      <div className={classes["register-form"]}>
        <h2>Register Form</h2>
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

export default RegisterForm;
