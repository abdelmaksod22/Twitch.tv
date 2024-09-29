import express, { json } from "express";
import Joi from "joi";
import expressValidation from "express-joi-validation";
import { verifyToken } from "../middlewares/auth.js";
import {
  getChannelSettings,
  patchChangePassword,
  putChannelSettings,
} from "../controllers/controllers.js";

const router = express.Router();

const channelSettingsSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  description: Joi.string().min(10).max(200).required(),
  title: Joi.string().min(3).max(30).required(),
  avatarUrl: Joi.string().uri().required(),
});

const changePasswordSchema = Joi.object({
  password: Joi.string().min(6).max(12),
  newPassword: Joi.string().min(6).max(12),
});

const validator = expressValidation.createValidator({});

router.get("/channel", verifyToken, getChannelSettings);

router.put(
  "/channel",
  verifyToken,
  validator.body(channelSettingsSchema),
  putChannelSettings
);

router.patch(
  "/password",
  verifyToken,
  validator.body(changePasswordSchema),
  patchChangePassword
);

export default router;
