export const isSignIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.session.returnTo = req.originalUrl;
		return res.redirect("/users/login");
	}
	next();
};
