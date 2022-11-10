import express from "express";

const router = express.Router({ mergeParams: true });

import { createPath, updatePath, showPath, deletePath, showAllPaths } from "../controllers/paths.js";
import { wrapAsync } from "../utils/index.js";

router.post('/', wrapAsync(createPath))
router.get('/all/:userId', wrapAsync(showAllPaths))
router.get('/:pathId', wrapAsync(showPath))
router.put('/:pathId', wrapAsync(updatePath))
router.delete('/:pathId', wrapAsync(deletePath))

export default router;