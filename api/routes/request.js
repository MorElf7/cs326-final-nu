import express from "express";

const router = express.Router({ mergeParams: true });

import {
	createRequest,
	deleteRequest,
	getAllRequest,
	getRequest,
	getSuggestions,
	updateRequest,
} from "../controllers/requests.js";
import { wrapAsync } from "../utils/index.js";

router.get("/", wrapAsync(getAllRequest));

router.post("/", wrapAsync(createRequest));

router.post("/suggestion", wrapAsync(getSuggestions));

router.get("/:requestId", wrapAsync(getRequest));

router.put("/", wrapAsync(updateRequest));

router.delete("/", wrapAsync(deleteRequest));

export default router;
