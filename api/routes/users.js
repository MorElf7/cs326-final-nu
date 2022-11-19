import express from "express";

const router = express.Router({ mergeParams: true });

import { login, signup, logout } from "../controllers/auth.js";
import {
	deleteUser,
	getMatches,
	getOutgoingRequest,
	getUser,
	updateUser,
} from "../controllers/users.js";
import { wrapAsync } from "../utils/index.js";
import passport from "passport"

router.post("/login", passport.authenticate("local", {failureRedirect: "/users/signin"}), login);

router.post("/signup", wrapAsync(signup));

router.post("/logout", logout);

router.get("/:userId/match", wrapAsync(getMatches));

router.get("/:userId/request", wrapAsync(getOutgoingRequest));

router.get("/:userId", wrapAsync(getUser));

router.put("/:userId", wrapAsync(updateUser));

router.delete("/:userId", wrapAsync(deleteUser));

export default router;
