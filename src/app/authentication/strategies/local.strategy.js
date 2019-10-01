module.exports = (function() {
	/* @imports */
	let chalk = require("chalk");
	let debug = require("debug");
	let mongodb = require("mongodb");
	let passport = require("passport");
	let localStrategy = require("passport-local");

	/* @constants */
	const DB_NAME = "BookLibrary";
	const DB_URL = "mongodb://localhost:27017";

	/* @globals */
	let MongoClient = mongodb.MongoClient;
	let Strategy = localStrategy.Strategy;

	let log = debug("library:$app/authentication/strategies/local.strategy");

	passport.use(new Strategy({
		usernameField: "username",
		passwordField: "password"
	}, function(username, password, done) {
		(async function() {
			let client;
			try {
				client = await MongoClient.connect(DB_URL);
				let db = client.db(DB_NAME);
				let collection = db.collection("users");
				let user = await collection.findOne({username});

				log(password, user);
				if (user.password === password) {
					done(null, user);
				} else {
					done(null, false);
				}
			} catch(e) {
				log(e);
			} finally {
				if (typeof client === "object" && client !== null) {
					client.close();
				}
			}
		})();
	}));
});
