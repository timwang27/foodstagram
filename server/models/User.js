const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: false,
  },
  recipes: {
    type: Array,
    required: true,
    default: [],
  },
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);
