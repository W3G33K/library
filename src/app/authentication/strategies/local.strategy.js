module.exports = (function initPassportLocalStrategy() {
	/* @imports */
	let chalk = require("chalk");
	let debug = require("debug");
	let localStrategy = require("passport-local");
	let passport = require("passport");

	/* @globals */
	let Strategy = localStrategy.Strategy;
	let log = debug("library:$app/authentication/strategies/local.strategy");

	passport.use(new Strategy({
		usernameField: "username",
		passwordField: "password"
	}, function(username, password, done) {
		log(username, password);
		let user = {username, password};
		done(null, user);
	}));
});
