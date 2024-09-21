import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String, unique: true },
});

export default mongoose.model("User", userSchema);
