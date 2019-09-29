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

	let log = debug("library:$app/routes/book.routes");
	let router = express.Router();

	/* @routes */
	router.route("/")
		.get(function(request, response) {
			log(chalk.green(message.format("server.onrequest.get")));
			(async function () {
				let client;
				try {
					client = await MongoClient.connect(DB_URL);
					let db = client.db(DB_NAME);
					let collection = await db.collection("books");
					let cursor = collection.find();

					let results = await cursor.toArray();
					response.render("books/index.view.ejs", {
						subtitle: "Books",
						books: results
					});
				} catch(e) {
					log(e);
				} finally {
					if (typeof client === "object" && client !== null) {
						client.close();
					}
				}
			})();
		});

	router.route("/book/:id")
		.get(function(request, response) {
			let id = request.params.id;
			log(chalk.green(message.format("server.onrequest.books.book.get", id)));
			(async function () {
				let client;
				try {
					client = await MongoClient.connect(DB_URL);
					let db = client.db(DB_NAME);
					let collection = await db.collection("books");

					let _id = new ObjectID(id);
					let result = await collection.findOne({_id});
					response.render("books/book.view.ejs", {
						subtitle: result.title,
						book: result
					});
				} catch(e) {
					log(e);
				} finally {
					if (typeof client === "object" && client !== null) {
						client.close();
					}
				}
			})();
		});

	return router;
})();
