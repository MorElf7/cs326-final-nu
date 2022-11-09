import express from "express";

const router = express.Router({ mergeParams: true });

import { createPath, updatePath, showPath, deletePath } from "../controllers/paths.js";
import { wrapAsync } from "../utils/index.js";

router.get('/:pathId', wrapAsync(showPath))
router.post('/', wrapAsync(createPath))
router.put('/:pathId', wrapAsync(updatePath))
router.delete('/:pathId', wrapAsync(deletePath))

export default router;