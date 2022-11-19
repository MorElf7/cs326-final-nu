import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import MongoStore from "connect-mongo";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";

//Import utils function
import { ExpressError } from "./api/utils/index.js";
import { deserializeUser, serializeUser, strategy } from "./api/utils/localStrategy.js";

//Backend Router
import PathBackendRouter from "./api/routes/paths.js";
import RequestBackendRouter from "./api/routes/request.js";
import UserBackendRouter from "./api/routes/users.js";

// Frontend Router
import HomeFrontendRouter from "./frontend/routes/home.js";
import RoutesPanelFrontendRouter from "./frontend/routes/paths.js";
import UserFrontendRouter from "./frontend/routes/users.js";

const app = express();

const port = process.env.PORT || 3000;

// const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017";
const dbUrl = "mongodb://127.0.0.1:27017";

const secret = process.env.SECRET || "developmentsecret";
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

// https://stackoverflow.com/questions/54173476/js-file-gets-a-neterr-aborted-404-not-found
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

const store = MongoStore.create({
	mongoUrl: dbUrl,
	secret,
	touchAfter: 3600,
});

store.on("error", function (e) {
	console.log("Session store error", e);
});

const sessionConfig = {
	store,
	name: "session",
	secret,
	resave: false,
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
		maxAge: 1000 * 3600 * 6,
	},
};

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.use("/static", express.static(path.resolve(__dirname, "./frontend/static")));

app.get("/", (req, res) => {
	res.redirect("/home");
});

// Backend Router
app.use("/api/users", UserBackendRouter);
app.use("/api/request", RequestBackendRouter);
app.use("/api/paths", PathBackendRouter);

// Frontend Router
app.use("/users", UserFrontendRouter);
app.use("/routesPanel", RoutesPanelFrontendRouter);
app.use("/home", HomeFrontendRouter);

app.all("*", (req, res, next) => {
	next(new ExpressError("Page not found", 404));
});

app.use((err, req, res, next) => {
	const { status = 500 } = err;
	if (!err.message) err.message = "Something went wrong!";
	const data = { status, message: err.message };
	res.status(status).json(data);
});

app.listen(port, () => {
	console.log(`Serving on port ${port}`);
});
