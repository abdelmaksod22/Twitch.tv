import Channel from "../../models/Channel.js";
import User from "../../models/User.js";

export const putChannelSettings = async (req, res) => {
  try {
    const { userId } = req.user;
    const { username, avatarUrl, title, description } = req.body;
    const userData = await User.findById(userId);
    if (userData.username !== username) {
      await User.updateOne({ _id: userId }, { username });
    }
    const channelData = await Channel.findByIdAndUpdate(
      userData.channel,
      {
        title,
        description,
        avatarUrl,
        isActive: true,
      },
      { new: true }
    );
    return res.status(200).send({
      username,
      channelId: channelData._id,
      description: channelData.description,
      title: channelData.title,
      avatarUrl: channelData.avatarUrl,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
};
