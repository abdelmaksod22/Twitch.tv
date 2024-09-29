import User from "../../models/User.js";
import bcrypt from "bcryptjs";

export const patchChangePassword = async (req, res) => {
  try {
    const { userId } = req.user;
    const { password, newPassword } = req.body;
    const userData = await User.findById(userId, { password: 1 });
    const isPasswordCorrect = await bcrypt.compare(password, userData.password);
    if (!isPasswordCorrect) {
      return res.status(400).send("Invalid password, please try again");
    }
    const encodedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ _id: userId }, { password: encodedPassword });
    return res.status(200).send("Password change successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
};
