const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/User");
const auth = require("./../middleware/auth");

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
  "/signup",
  [
    check("username", "Please Enter a Valid Username").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { username, email, password } = req.body;
    try {
      let user = await User.findOne({
        username,
      });
      if (user) {
        return res.status(400).json({
          msg: "User Already Exists",
        });
      }

      user = new User({
        username,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
          // Add more fields to the payload
        },
      };

      jwt.sign(
        payload,
        "secretString",
        // Make a new hash String
        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email,
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist",
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !",
        });

      const payload = {
        user: {
          id: user.id,
          // Add more fields to the payload
        },
      };

      jwt.sign(
        payload,
        "secretString",
        // Use the same secret string for signing
        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

/**
 * @method - GET
 * @description - Get LoggedIn User
 * @param - /user/me
 */

router.get("/me", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

router.delete("/remove-user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const response = await User.deleteOne(user);
    res.json(response);
  } catch (e) {
    res.send({ message: "There was an error with deleting your account." });
  }
});

router.put("/update-user", auth, async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const response = await User.updateOne(
      { _id: req.user.id },
      { $set: req.body }
    );
    res.json(response);
  } catch (e) {
    res.send({ message: "There was an error with updating your information." });
  }
});

// Use to get user's saved recipes
router.get("/recipes", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(user.recipes);
    res.json(user.recipes);
  } catch (e) {
    res.send({ message: "Error in Fetching user's saved recipes" });
  }
});

// Use to add recipe to user's profile
router.post("/add", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(req.body.item);
    if (user.recipes.indexOf(req.body.item) === -1) {
      user.recipes.push(req.body.item);
      user.save();
      console.log("added a recipe to saved recipes");
      res.json(user.recipes);
    }
  } catch (e) {
    res.send({ message: "Error in Fetching user's saved recipes" });
  }
});

// Use to delete recipe from user's profile
router.post("/delete", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.recipes.indexOf(req.body.item) != -1) {
      user.recipes.splice(user.recipes.indexOf(req.body.item), 1);
      user.save();
      res.json(user.recipes);
    }
  } catch (e) {
    res.send({ message: "Error in Fetching user's saved recipes" });
  }
});

module.exports = router;
