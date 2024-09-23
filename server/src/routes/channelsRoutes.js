import express from "express";
import Joi from "joi";
import expressValidation from "express-joi-validation";

import { getChannelDetails, getChannels } from "../controllers/controllers.js";

const router = express.Router();

const channelDetailsSchema = Joi.object({
  channelId: Joi.string().required(),
});

const validator = expressValidation.createValidator({});

router.get(
  "/:channelId",
  validator.params(channelDetailsSchema),
  getChannelDetails
);

router.get("/", getChannels);

export default router;
