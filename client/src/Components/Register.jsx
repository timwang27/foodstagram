import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import "./../App.css";

export const Register = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/user/signup", {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        props.onFormSwitch("login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card id="LoginCard">
      <Form width="500" height="500" onSubmit={handleSubmit}>
        <h1 id="Logo">Foodstagram</h1>
        <div id="center">
          <h2 id="loginBlurb">Sign up for Foodstagram</h2>
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label id="label" htmlFor="username">
            Username
          </Form.Label>
          <Form.Control
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            id="username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label id="label" htmlFor="email">
            Email address
          </Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label id="label" htmlFor="password">
            Password
          </Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
          />
        </Form.Group>
        <div id="center">
          <Button variant="primary" type="submit" id="mainButton">
            Sign Up
          </Button>
        </div>
        <div></div>
        <a id="label">
          Already have an account?
          <Button
            variant="link"
            className="link-btn"
            onClick={() => props.onFormSwitch("login")}
          >
            Login here.
          </Button>
        </a>
      </Form>
    </Card>
  );
};
