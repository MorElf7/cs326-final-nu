import express from "express";

const router = express.Router({ mergeParams: true });

import { renderHtml } from "../utils/index.js";

router.get("/login", renderHtml("login/login.html"));

// router.post("/signup", wrapAsync(createUser));

// router.get("/:userId", wrapAsync(getUser));

// router.update("/:userId", wrapAsync(updateUser));

// router.delete("/:userId", wrapAsync(deleteUser));

export default router;
