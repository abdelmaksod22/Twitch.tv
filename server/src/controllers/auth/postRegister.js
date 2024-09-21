import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const postRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.exists({ email });
    if (userExists) {
      return res.status(409).send("Email is already exist");
    }
    const encryptPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: encryptPassword,
    });
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "8h",
      }
    );
    return res.status(201).json({
      userDetails: {
        email: user.email,
        username,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error occured. Please try again");
  }
};
