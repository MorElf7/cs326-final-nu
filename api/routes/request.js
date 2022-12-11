import express from "express";

const router = express.Router({ mergeParams: true });

import { isSignIn } from "../../middleware.js";
import {
	createRequest,
	deleteRequest,
	getAllRequest,
	getRequest,
	getSuggestions,
	rejectRequest,
	updateRequest,
	removeMatch,
} from "../controllers/requests.js";
import { wrapAsync } from "../utils/index.js";

router.get("/", wrapAsync(getAllRequest));

router.post("/", isSignIn, wrapAsync(createRequest));

router.post("/reject", isSignIn, wrapAsync(rejectRequest));

router.put("/", isSignIn, wrapAsync(updateRequest));

router.delete("/", isSignIn, wrapAsync(deleteRequest));

router.post("/suggestion", wrapAsync(getSuggestions));

router.get("/:requestId", wrapAsync(getRequest));

router.put("/removeMatch", wrapAsync(removeMatch))
export default router;
