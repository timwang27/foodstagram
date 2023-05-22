import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import "./../App.css";

export const Login = (props) => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/user/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        if (response.statusText === "OK") {
          navigate("/search");
        }
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
          <h2 id="loginBlurb">Welcome to Foodstagram</h2>
        </div>
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
            Log In
          </Button>
        </div>
        <div></div>
        <a id="label">
          New to Foodstagram?
          <Button
            variant="link"
            className="link-btn"
            onClick={() => props.onFormSwitch("register")}
          >
            Create Account
          </Button>
        </a>
      </Form>
    </Card>
  );
};
