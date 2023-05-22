import React, { useState } from "react";
import RecipeOTD from "./RecipeOTD";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Login } from "./Login";
import { Register } from "./Register";
import "./../App.css";
import randomRecipes from "../randomRecipes.json";

function LandingPage() {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  const i = Math.floor(Math.random() * 10);
  console.log(i);
  return (
    <div className="App">
      <header className="App-header"></header>
      <Container id="LandingPage" fluid>
        <Row
          style={{
            height: "100%",
            padding: "2% 0",
          }}
        >
          <Col
            md={8}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RecipeOTD
              image={randomRecipes.recipes[i].image}
              summary={randomRecipes.recipes[i].summary}
              dishType={
                randomRecipes.recipes[i].dishTypes[0] &&
                randomRecipes.recipes[i].dishTypes[0].toUpperCase()
              }
              title={randomRecipes.recipes[i].title}
              readyInMinutes={randomRecipes.recipes[i].readyInMinutes}
              aggregateLikes={randomRecipes.recipes[i].aggregateLikes}
              analyzedInstructions={
                randomRecipes.recipes[i].analyzedInstructions[0] === undefined
                  ? ["No instructions given"]
                  : randomRecipes.recipes[i].analyzedInstructions[0].steps
              }
              extendedIngredients={randomRecipes.recipes[i].extendedIngredients}
            />
          </Col>
          <Col
            md={4}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {currentForm === "login" ? (
              <Login onFormSwitch={toggleForm} />
            ) : (
              <Register onFormSwitch={toggleForm} />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage;
