module.exports = {
	ensureAuthenticated: function(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		req.flash("error_msg", "You are not logged in. Login to view resource");
		res.redirect("/users/login");
	}
};
