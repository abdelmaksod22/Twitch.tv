import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String, unique: true },
  channel: { type: Schema.Types.ObjectId, ref: "Channel" },
  followedChannels: { type: [{ type: Schema.Types.ObjectId, ref: "Channel" }] },
});

export default mongoose.model("User", userSchema);
