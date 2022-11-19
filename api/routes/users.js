import express from "express";

const router = express.Router({ mergeParams: true });

import { login, logout, postLogin, signup } from "../controllers/auth.js";
import { deleteUser, getMatches, getUser, updateUser } from "../controllers/users.js";
import { wrapAsync } from "../utils/index.js";

router.post("/login", login, postLogin);

router.post("/signup", wrapAsync(signup));

router.post("/logout", logout);

router.get("/:userId/match", wrapAsync(getMatches));

router.get("/:userId", wrapAsync(getUser));

router.put("/:userId", wrapAsync(updateUser));

router.delete("/:userId", wrapAsync(deleteUser));

export default router;
