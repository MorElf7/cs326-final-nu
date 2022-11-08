import express from "express";

const router = express.Router({ mergeParams: true });

import { createUser, deleteUser, getUser, login, updateUser } from "../controllers/users.js";
import { wrapAsync } from "../utils/index.js";

router.post("/login", wrapAsync(login));

router.post("/", wrapAsync(createUser));

router.get("/:userId", wrapAsync(getUser));

router.put("/:userId", wrapAsync(updateUser));

router.delete("/:userId", wrapAsync(deleteUser));

export default router;
