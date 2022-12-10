import express from "express";

const router = express.Router({ mergeParams: true });

import { isSignIn } from "../../middleware.js";
import { renderHtml } from "../utils/index.js";

router.get("/login", renderHtml("login/login.html"));

router.get("/signup", renderHtml("signup/signup.html"));

router.get("/:userId/match", isSignIn, renderHtml("match/match.html"));

router.get("/:userId/request", isSignIn, renderHtml("match/request.html"));

router.get("/:userId/userRequest", isSignIn, renderHtml("match/userRequest.html"));

router.get("/:userId/suggestion", isSignIn, renderHtml("match/suggestion.html"));

router.get("/profile/", isSignIn,renderHtml("homepage/profile.html"));

router.get("/:userId/edit", renderHtml("homepage/edit.html"));

export default router;
