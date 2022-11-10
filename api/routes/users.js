import express from "express";

const router = express.Router({ mergeParams: true });

import {
	createUser,
	deleteUser,
	getMatches,
	getOutgoingRequest,
	getUser,
	login,
	updateUser,
} from "../controllers/users.js";
import { wrapAsync } from "../utils/index.js";

router.post("/login", wrapAsync(login));

router.post("/", wrapAsync(createUser));

router.get("/:userId/match", wrapAsync(getMatches));

router.get("/:userId/request", wrapAsync(getOutgoingRequest));

router.get("/:userId", wrapAsync(getUser));

router.put("/:userId", wrapAsync(updateUser));

router.delete("/:userId", wrapAsync(deleteUser));

export default router;
