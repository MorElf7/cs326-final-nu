import express from "express";

const router = express.Router({ mergeParams: true });

import { renderHtml } from "../utils/index.js";

router.get("/login", renderHtml("login/login.html"));

router.get("/signup", renderHtml("signup/signup.html"));

export default router;
