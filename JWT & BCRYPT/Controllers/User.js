import express from "express";
import User from "../Model/UserModel.js"; // Import the User model
import jwt from "jsonwebtoken"; // Import jsonwebtoken for creating JWT tokens

// Function to create a JWT token
const createToken = (_id) => {
  // Create and return a JWT token that expires in 3 days
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "3d" });
};

// Placeholder login function
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Attempt to login the user with the provided email and password
    const user = await User.login(email, password);
    // Create a JWT token for the new user
    const token = createToken(user._id);
    // Respond with the user's email and the generated token
    res.status(200).json({ email, token });
  } catch (error) {
    // Handle errors, such as if the email is already in use
    res.status(400).json({ error: error.message });
  }
};


// Signup function to register a new user
export const signup = async (req, res) => {
  // Extract email and password from the request body
  const { email, password } = req.body;

  try {
    // Attempt to sign up the user with the provided email and password
    const user = await User.signup(email, password);
    // Create a JWT token for the new user
    const token = createToken(user._id);
    // Respond with the user's email and the generated token
    res.status(200).json({ email, token });
  } catch (error) {
    // Handle errors, such as if the email is already in use
    res.status(400).json({ error: error.message });
  }
};
