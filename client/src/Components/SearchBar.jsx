import React, { useState } from "react";
import "./../App.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import RecipeGrid from "./RecipeGrid";
import { useNavigate } from "react-router-dom";

function SearchBar(props) {
  let booleanFocus = props.focus;
  let navigate = useNavigate();
  let [recipes, setRecipes] = useState();
  const load_recipe = (e) => {
    e.preventDefault();
    let ingredients = e.target[0].value;
    ingredients = ingredients.replaceAll(" ", "");
    ingredients = ingredients.replaceAll(",", ",+");
    axios
      .get(
        `http://localhost:4000/searched-recipes?ingredients=${ingredients}`,
        { timeout: 10 * 1000 }
      )
      .then(
        (res) => {
          setRecipes(res.data);
          navigate("/result");
        },
        (err) => {
          console.log("Error: ", err);
        }
      );
  };
  return (
    <>
      <Form id="center" onSubmit={load_recipe}>
        <Form.Group className="mb-3">
          <Form.Control
            autoFocus={booleanFocus}
            id="searchBar"
            type="text"
            placeholder="Feed us your ingredients..."
          />
        </Form.Group>
      </Form>
      <RecipeGrid recipes={recipes} shouldSave={true}></RecipeGrid>
    </>
  );
}

export default SearchBar;
