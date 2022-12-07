import express from "express";

const router = express.Router({ mergeParams: true });

import { getCurrentUser, login, logout, postLogin, signup } from "../controllers/auth.js";
import { deleteUser, getMatches, getUser, updateUser } from "../controllers/users.js";
import { isSignIn } from "../middleware.js";
import { wrapAsync } from "../utils/index.js";

router.get("/currentUser", getCurrentUser);

router.post("/login", login, postLogin);

router.post("/signup", wrapAsync(signup));

router.post("/logout", isSignIn, logout);

router.get("/:userId/match", wrapAsync(getMatches));

router.get("/:userId", wrapAsync(getUser));

router.put("/:userId", isSignIn, wrapAsync(updateUser));

router.delete("/:userId", isSignIn, wrapAsync(deleteUser));

export default router;
