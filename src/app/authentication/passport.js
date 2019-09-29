module.exports = (function initPassport(app) {
	/* @imports */
	let initPassportLocalStrategy = require("$app/authentication/strategies/local.strategy");

	let chalk = require("chalk");
	let debug = require("debug");
	let passport = require("passport");

	/* @globals */
	let log = debug("library:$app/authentication/passport");

	/* @middleware */
	app.use(passport.initialize());
	app.use(passport.session());

	initPassportLocalStrategy();

	passport.deserializeUser(function(user, done) {
		done(null, user);
	});

	passport.serializeUser(function(user, done) {
		done(null, user);
	});
});
