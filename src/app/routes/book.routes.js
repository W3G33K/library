module.exports = (function() {
	/* @imports */
	let config = require("$src/config.json");
	let messages = require("$src/messages.json");

	let chalk = require("chalk");
	let debug = require("debug");
	let express = require("express");

	/* @constants */
	const SCHEME_QUALIFIER = "://";

	/* @globals */
	let log = debug("library:app.book.routes");
	let router = express.Router();

	/* @routes */
	router.route("/")
		.get(function(request, response) {
			log(chalk.green(messages.onrequest.get));
			let {title, separator} = config;
			response.render("books/books.view.ejs", {
				title: title,
				separator: separator,
				subtitle: "Books"
			});
		});

	router.route("/:id")
		.get(function(request, response) {
			log(chalk.green(messages.onrequest.books.book.get), chalk.cyan(request.params.id));
			response.send([request.protocol, SCHEME_QUALIFIER, request.hostname, request.originalUrl].join(""));
		});

	return router;
})();
