import React, { useState } from "react";
import NavBar from "./NavBar";
import RecipeGrid from "./RecipeGrid";
import axios from "axios";
import "./../App.css";

function SavedRecipes() {
  let [recipes, setRecipes] = useState();
  const load_recipe = () => {
    let recipeIds;
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:4000/user/recipes", { headers: { token: token } })
      .then((res) => {
        recipeIds = res.data;
      })
      .catch((error) => console.log(error))
      .then(() => {
        let recipeIdString = recipeIds.map(String).join(",");
        axios
          .get(`http://localhost:4000/saved-recipes?allIDs=${recipeIdString}`, {
            timeout: 10 * 1000,
          })
          .then(
            (res) => {
              setRecipes(res.data);
            },
            (err) => {
              console.log("Error: ", err);
            }
          );
      });
  };

  if (recipes === undefined) {
    return <div onLoad={load_recipe()}>Loading...</div>;
  } else {
    return (
      <div>
        <NavBar searchbar={false} />
        <h1
          id="Logo"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Saved Recipes
        </h1>
        <RecipeGrid recipes={recipes} shouldSave={false} />
      </div>
    );
  }
}

export default SavedRecipes;
