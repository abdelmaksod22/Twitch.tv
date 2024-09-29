import express from "express";
import Joi from "joi";
import expressValidation from "express-joi-validation";

import {
  getChannelDetails,
  getChannels,
  getFollowedChannels,
  postFollowChannel,
} from "../controllers/controllers.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

const channelDetailsSchema = Joi.object({
  channelId: Joi.string().required(),
});

const validator = expressValidation.createValidator({});

router.get("/followed", verifyToken, getFollowedChannels);

router.post(
  "/follow",
  verifyToken,
  validator.body(channelDetailsSchema),
  postFollowChannel
);

router.get(
  "/:channelId",
  validator.params(channelDetailsSchema),
  getChannelDetails
);

router.get("/", getChannels);

export default router;
