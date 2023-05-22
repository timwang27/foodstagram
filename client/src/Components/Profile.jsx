import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import "./../App.css";

export const Profile = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  let navigate = useNavigate();

  let getUser = () => {
    axios
      .get("http://localhost:4000/user/me")
      .then((res) => {
        setEmail(res.body.email);
        setPassword(res.body.password);
        setUsername(res.body.username);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:4000/user/update-user", {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        navigate("/recipes");
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
          <h2 id="loginBlurb">Change Your Information</h2>
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label id="label" htmlFor="username">
            Username
          </Form.Label>
          <Form.Control
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder={username}
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
            placeholder={email}
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
            placeholder={password}
            name="password"
          />
        </Form.Group>
        <div id="center">
          <Button variant="primary" type="submit" id="mainButton">
            Save Info
          </Button>
        </div>
        <div></div>
      </Form>
    </Card>
  );
};
