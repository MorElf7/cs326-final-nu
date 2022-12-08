import express from "express";
import { isSignIn } from "../../middleware.js";

const router = express.Router({ mergeParams: true });

import { renderHtml } from "../utils/index.js";

router.get("/", isSignIn,renderHtml("routesPanel/routesPanel.html"));

export default router;