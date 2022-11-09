import express from "express";

const router = express.Router({ mergeParams: true });

import { createPath, updatePath, showPath, deletePath, showAllPaths } from "../controllers/paths.js";
import { wrapAsync } from "../utils/index.js";

router.get('/:pathId', wrapAsync(showPath))
router.get('/', wrapAsync(showAllPaths))
router.post('/', wrapAsync(createPath))
router.put('/:pathId', wrapAsync(updatePath))
router.delete('/:pathId', wrapAsync(deletePath))

export default router;