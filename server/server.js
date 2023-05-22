const express = require("express");
const user = require("./routes/user");
const InitiateMongoServer = require("./config/db");
const cors = require("cors");
const axios = require("axios");

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

const apiKey = "dd1c3f39f7f84af2b393ed34dd63ebe3";
//Fresh spare api key: 77c0bb5cc77941f187a07ec0538c086b

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

// /**
//  * Router Middleware
//  * Router - /user/*
//  * Method - *
//  */
app.use("/user", user);

app.get("/searched-recipes", async function (req, res) {
  const ingredients = req.query.ingredients;
  // const ingredients = 'chicken'; // Search bar input...
  const recipeID = [];
  axios
    .get(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}&number=16`
    )
    .then((body) => {
      for (let i = 0; i < body.data.length; i++) {
        recipeID.push(body.data[i].id);
      }
      const allID = recipeID.map(String).join(",");
      axios
        .get(
          `https://api.spoonacular.com/recipes/informationBulk?apiKey=${apiKey}&ids=${allID}`
        )
        .then((body) => {
          res.json(body.data);
        });
    });
});

app.get("/saved-recipes", async function (req, res) {
  const allID = req.query.allIDs;
  axios
    .get(
      `https://api.spoonacular.com/recipes/informationBulk?apiKey=${apiKey}&ids=${allID}`
    )
    .then((body) => {
      res.json(body.data);
    });
});

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
