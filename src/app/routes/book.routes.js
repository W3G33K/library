module.exports = (function() {
	/* @imports */
	let config = require("$src/config.json");
	let MessageClass = require("$app/messages/message.class");

	let chalk = require("chalk");
	let debug = require("debug");
	let express = require("express");

	/* @globals */
	let message = new MessageClass();

	let log = debug("library:$app/routes/book.routes");
	let router = express.Router();

	/* @routes */
	router.route("/")
		.get(function(request, response) {
			log(chalk.green(message.format("server.onrequest.get")));
			let {title, separator} = config;
			response.render("books/index.view.ejs", {
				title: title,
				separator: separator,
				subtitle: "Books"
			});
		});

	router.route("/book/:id")
		.get(function(request, response) {
			let {title, separator} = config;
			let id = request.params.id;

			log(chalk.green(message.format("server.onrequest.books.book.get", id)));
			response.render("books/book.view.ejs", {
				title: title,
				separator: separator,
				subtitle: "Book Title",
				id: id
			});
		});

	return router;
})();
