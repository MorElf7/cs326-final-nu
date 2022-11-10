import express from "express";

const router = express.Router({ mergeParams: true });

import { renderHtml } from "../utils/index.js";

router.get("/login", renderHtml("login/login.html"));

router.get("/signup", renderHtml("signup/signup.html"));

router.get("/:userId/match", renderHtml("match/match.html"));

router.get("/:userId/request", renderHtml("match/request.html"));

router.get("/:userId/userRequest", renderHtml("match/userRequest.html"));

router.get("/:userId/suggestion", renderHtml("match/suggestion.html"));

export default router;
