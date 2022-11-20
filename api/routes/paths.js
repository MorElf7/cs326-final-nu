import express from "express";

const router = express.Router({ mergeParams: true });

import { createPath, updatePath, showPath, deletePath, showAllPaths } from "../controllers/paths.js";
import { wrapAsync } from "../utils/index.js";

router.post('/', wrapAsync(createPath))
router.get('/:userId', wrapAsync(showPath))
router.put('/:userId', wrapAsync(updatePath))
router.delete('/:pathId', wrapAsync(deletePath))

export default router;