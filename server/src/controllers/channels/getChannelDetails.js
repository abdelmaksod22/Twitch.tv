import axios from "axios";

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

    const streamUrl = `http://localhost:8000/live/${channel.streamKey}.flv`;

    const requestData = await axios.get("http://localhost:8000/api/streams");

    const activeStreams = requestData.data;

    let liveStreams = [];

    for (const streamId in activeStreams?.live) {
      if (
        activeStreams.live[streamId].publisher &&
        activeStreams.live[streamId].publisher !== null
      ) {
        liveStreams.push(streamId);
      }
    }

    const isOnline = liveStreams.includes(channel.streamKey);
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
    return res.status(500).send("Channel Not found. please check your url.");
  }
};
