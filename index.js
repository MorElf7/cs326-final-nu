import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from "express";
import mongoose from "mongoose";

//Import utils function
import { ExpressError } from "./api/utils/index.js";

//Backend Router
import PathBackendRouter from "./api/routes/paths.js";
import RequestBackendRouter from "./api/routes/request.js";
import UserBackendRouter from "./api/routes/users.js";

// Frontend Router
import RoutesPanelFrontendRouter from "./frontend/routes/paths.js";
import HomeFrontendRouter from './frontend/routes/home.js'
import UserFrontendRouter from "./frontend/routes/users.js";

const app = express();

const port = process.env.PORT || 3000;

const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017";
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

// https://stackoverflow.com/questions/54173476/js-file-gets-a-neterr-aborted-404-not-found
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.resolve(__dirname, "./frontend/static")));

// Backend Router
app.use("/api/users", UserBackendRouter);
app.use("/api/request", RequestBackendRouter);

// Frontend Router
app.use("/users", UserFrontendRouter);
app.use("/routesPanel", RoutesPanelFrontendRouter);
app.use('/home', HomeFrontendRouter)

app.all("*", (req, res, next) => {
	next(new ExpressError("Page not found", 404));
});

app.use((err, req, res, next) => {
	const { statusCode = 500 } = err;
	if (!err.message) err.message = "Something went wrong!";
	res.status(statusCode);
	res.send({ err });
});

app.listen(port, () => {
	console.log(`Serving on port ${port}`);
});
