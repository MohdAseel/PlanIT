const UserModal = require("../models/user"); // Import the User model
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for creating tokens
const dotenv = require("dotenv"); // Import dotenv for environment variables
const Token = require("../models/token.js");

dotenv.config(); // Initialize dotenv

const signupUser = async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const user = await UserModal.findOne({ email });

    if (user) {
      return response.status(400).json({ message: "User already exists" }); // Send a response if the user already exists
    }
    const userModal = new UserModal({ name, email, password }); // Create a new user document
    userModal.password = await bcrypt.hash(password, 10); // Hash the password before saving it in the database
    await userModal.save(); // Save the new user document in the database

    response.status(200).json({ message: "User created" });
  } catch (error) {
    return response.status(500).json({
      message: "An error occurred while creating the user",
    }); // Send a response if an error occurs
  }
};

const loginUser = async (request, response) => {
  try {
    const { email, password } = request.body;
    console.log(email);
    const user = await UserModal.findOne({ email }); // Check if the user already exists
    const errorMSG = "Auth Failed mail or password is wrong";
    if (!user) {
      return response.status(400).json({ message: errorMSG }); // Send a response if the user already exists
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return response.status(400).json({ message: errorMSG, success: false }); // Send a response if the user already exists
    }
    const accessToken = jwt.sign(user.toJSON(), process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      user.toJSON(),
      process.env.JWT_REFRESH_SECRET
    );

    const newToken = new Token({ token: refreshToken });
    await newToken.save();

    response
      .status(200)
      .json({
        accessToken,
        refreshToken,
        name: user.name,
        email: user.email,
        role: user.role,
        class: user.class,
      });
  } catch (error) {
    response.status(500).json({
      message: "An error occurred while logining the user",
    }); // Send a response if an error occurs
  }
};

const logoutUser = async (request, response) => {
  const token = request.body.token;
  await Token.deleteOne({ token: token });

  response.status(200).json({ message: "Logout successfully" });
};
module.exports = { signupUser, loginUser, logoutUser }; // Export the signupUser function

