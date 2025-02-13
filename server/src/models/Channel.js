import mongoose from "mongoose";
import { v4 as uuid } from "uuid";

const { Schema } = mongoose;

const defaultTitle = "New Channel";
const defaulDescription = "This is New Channel Description";

const channelSchema = new Schema({
  isActive: { type: Boolean, default: false },
  title: { type: String, default: defaultTitle },
  description: { type: String, default: defaulDescription },
  avatarUrl: { type: String, default: "none" },
  streamKey: { type: String, default: uuid },
});

export default mongoose.model("Channel", channelSchema);
