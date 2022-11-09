import express from "express";

const router = express.Router({ mergeParams: true });

import {
	createRequest,
	deleteRequest,
	getAllRequest,
	getRequest,
	updateRequest,
} from "../controllers/requests.js";
import { wrapAsync } from "../utils/index.js";

router.get("/", wrapAsync(getAllRequest));

router.post("/", wrapAsync(createRequest));

router.get("/:requestId", wrapAsync(getRequest));

router.put("/:requestId", wrapAsync(updateRequest));

router.delete("/:requestId", wrapAsync(deleteRequest));

export default router;
