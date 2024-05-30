import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

// To understand below code watch https://www.youtube.com/watch?v=mjZIv4ey0ps&list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT&index=3&ab_channel=NetNinja
//This is custom function
UserSchema.statics.signup = async function (email, password) {
  // Validators
  if (!email || !password) {
    throw new Error("All Field Must be filled");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Write Email correctly");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Write Strong Password");
  }
  // Check if the email already exists
  const exist = await this.findOne({ email });
  if (exist) {
    throw new Error("Email in use");
  }

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10); // 10 is the number of salt rounds
  const hash = await bcrypt.hash(password, salt);

  // Create the user with hashed password
  const user = await this.create({ email, password: hash });
  return user;
};

UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All Field Must be filled");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Incorrect Email");
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect Password");
  }
  return user;
};

const User = mongoose.model("User", UserSchema);

export default User;
