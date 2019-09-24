module.exports = (function() {
	/* @imports */
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
			response.render("books/index.view.ejs", {
				subtitle: "Books"
			});
		});

	router.route("/book/:id")
		.get(function(request, response) {
			let id = request.params.id;
			log(chalk.green(message.format("server.onrequest.books.book.get", id)));
			response.render("books/book.view.ejs", {
				subtitle: "Book Title",
				id: id
			});
		});

	return router;
})();
