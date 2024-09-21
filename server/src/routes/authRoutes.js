import express from "express";
import Joi from "joi";
import expressValidation from "express-joi-validation";

import { postRegister, postLogin } from "../controllers/controllers.js";

const router = express.Router();
const validator = expressValidation.createValidator({});

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(6).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(12).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(12).required(),
});

router.post("/register", validator.body(registerSchema), postRegister);

router.post("/login", validator.body(loginSchema), postLogin);

export default router;
