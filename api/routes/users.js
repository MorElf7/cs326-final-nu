import express from "express";

const router = express.Router({ mergeParams: true });

import { deleteUser, getUser, login, updateUser } from "../controllers/user.js";
import { wrapAsync } from "../utils";


router.post("/login", wrapAsync(login));

router.post("/", wrapAsync(createUser));

router.get("/:userId", wrapAsync(getUser));

router.update("/:userId", wrapAsync(updateUser));

router.delete("/:userId", wrapAsync(deleteUser));

export default router;