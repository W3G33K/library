module.exports = (function() {
	/* @imports */
	let MessageClass = require("$app/messages/message.class");

	let chalk = require("chalk");
	let debug = require("debug");
	let express = require("express");
	let mongodb = require("mongodb");

	/* @constants */
	const DB_NAME = "BookLibrary";
	const DB_URL = "mongodb://localhost:27017";

	/* @globals */
	let MongoClient = mongodb.MongoClient,
		ObjectID = mongodb.ObjectID;
	let message = new MessageClass();

	let log = debug("library:$app/routes/user.routes");
	let router = express.Router();

	/* @routes */
	router.route("/user/profile")
		.get(function(request, response) {
			log(chalk.green(message.format("server.onrequest.get")));
			response.json({
				message: "Currently viewing your user profile.",
				user: request.user || "undefined"
			});
		});

	router.route("/user/profile/:id")
		.get(function(request, response) {
			let id = request.params.id;
			log(chalk.green(message.format("server.onrequest.users.user.get", id)));
			response.json({
				"message": "Currently viewing another user's profile."
			});
		});

	router.route("/user/login")
		.post(function(request, response) {
			response.json(request.body);
		});

	router.route("/user/register")
		.post(function(request, response) {
			request.login(request.body, function() {
				response.redirect("/users/user/profile");
			});
		});

	return router;
})();
