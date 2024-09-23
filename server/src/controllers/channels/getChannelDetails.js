import User from "../../models/User.js";
import Channel from "../../models/Channel.js";

export const getChannelDetails = async (req, res) => {
  try {
    const { channelId } = req.params;
    const channel = await Channel.findById(channelId);
    if (!channel || !channel.isActive) {
      return res.status(404).send("Channel Not found");
    }
    const user = await User.findOne({ channel: channelId }, { username: 1 });
    const streamUrl = "http";
    const isOnline = false;
    return res.status(201).json({
      id: channel._id,
      title: channel.title,
      username: user.username,
      description: channel.description,
      isOnline,
      streamUrl: streamUrl,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
};
