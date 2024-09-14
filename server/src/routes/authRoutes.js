import express from "express";

import { postRegister, postLogin } from "../controllers/controllers.js";

const router = express.Router();

router.post("/regiseter", postRegister);

router.post("/login", postLogin);

export default router;
