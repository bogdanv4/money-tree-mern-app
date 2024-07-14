const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "Please add a first name"],
      maxlength: 32,
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Please add a last name"],
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please add an E-mail"],
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Please add a password"],
      minlength: [8, "Password must have at least 8 characters"],
    },
    username: {
      type: String,
      trim: true,
      required: [true, "Please add an username"],
      unique: true,
    },
    address: {
      type: String,
      trim: true,
      required: [true, "Please add an address"],
    },
    sex: {
      type: String,
      trim: true,
      required: [true, "Please add a sex"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Please add a phone number"],
    },
    date: {
      type: String,
      required: [true, "Please add a date of birth"],
    },
  },
  { timestamps: true }
);

//Encrypting password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//Verify password
userSchema.methods.comparePassword = async function (yourPassword) {
  return await bcrypt.compare(yourPassword, this.password);
};

//Get token
userSchema.methods.jwtGenerateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, { expiresIn: 3600 });
};
module.exports = mongoose.model("User", userSchema);
