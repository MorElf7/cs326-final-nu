import express from "express";

const router = express.Router({ mergeParams: true });

import { renderHtml } from "../utils/index.js";
router.get("/home", renderHtml("homepage/homepage.html"));

export default router;