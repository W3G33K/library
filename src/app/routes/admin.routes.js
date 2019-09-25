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
	let MongoClient = mongodb.MongoClient;
	let message = new MessageClass();

	let log = debug("library:$app/routes/admin.routes");
	let router = express.Router();

	/* @routes */
	router.route("/")
		.get(function(request, response) {
			log(chalk.green(message.format("server.onrequest.get")));
			(async function() {
				let client;
				try {
					client = await MongoClient.connect(DB_URL);
	
					let db = client.db(DB_NAME);
					let collection = await db.collection("books").insertMany(
						[
							{
								"title": "Excepteur Ex",
								"description": "Amet dolore commodo sint minim minim occaecat quis amet laboris do cillum velit nisi mollit. Mollit veniam elit ad Lorem qui. Cupidatat eiusmod duis pariatur reprehenderit exercitation cupidatat id reprehenderit consectetur. Dolor deserunt in in veniam anim dolore est dolor. Nisi sunt excepteur qui et sunt non commodo cupidatat ut velit minim do ipsum reprehenderit.\r\n"
							},
							{
								"title": "Fugiat Lorem",
								"description": "Commodo aliquip est nulla aute qui nostrud exercitation ad in ex quis culpa. Amet id aliquip consequat excepteur ad Lorem est est ea. Nostrud sit mollit mollit reprehenderit quis.\r\n"
							},
							{
								"title": "Esse Enim",
								"description": "Ullamco eiusmod eu ullamco eu sint quis excepteur tempor. Magna labore consequat deserunt pariatur sunt sunt mollit commodo in. Occaecat ea sunt reprehenderit ullamco ad non nostrud veniam magna nulla proident nulla nisi duis. Ipsum culpa voluptate amet elit minim reprehenderit ex duis aute nisi tempor dolor eu. Ullamco occaecat aute minim cillum esse. Anim incididunt dolore id do aute quis amet ut adipisicing officia incididunt. Enim amet eu exercitation dolore ut ea irure non labore cupidatat.\r\n"
							},
							{
								"title": "Laborum Voluptate",
								"description": "Consectetur est pariatur enim velit. Culpa sit voluptate dolore excepteur excepteur aliquip duis Lorem excepteur quis quis. Ad in excepteur elit proident sint tempor sunt mollit magna aliqua.\r\n"
							},
							{
								"title": "Lorem Aliqua",
								"description": "Est eiusmod quis ullamco fugiat do sint cupidatat voluptate labore reprehenderit ex veniam. Dolore anim cillum consequat aute nisi. Cupidatat ex nulla ullamco anim.\r\n"
							},
							{
								"title": "Aliquip Non",
								"description": "Consequat sint aliqua ea qui ea fugiat ipsum nostrud velit amet. Dolore amet fugiat amet veniam sit aliquip cillum consectetur pariatur exercitation cillum ea. Velit in ea eu ad ex velit tempor consequat magna reprehenderit est in reprehenderit aliquip. Excepteur quis consequat reprehenderit laborum sit aute occaecat minim eu officia. Sint labore ut elit magna. Eiusmod veniam laboris eu ex Lorem irure fugiat ut amet reprehenderit do. Velit voluptate consectetur mollit minim minim pariatur.\r\n"
							},
							{
								"title": "Tempor Consequat",
								"description": "Ea eiusmod duis cupidatat amet. Consequat officia minim cupidatat nisi ipsum duis. Dolor sint do velit mollit aute aliqua in consequat tempor. Nostrud commodo officia sit dolore voluptate elit et laboris dolor incididunt commodo tempor ex esse. Adipisicing ut id eu nulla. Ut laborum eu nulla duis laborum consequat laborum fugiat aute occaecat. Anim exercitation enim mollit Lorem.\r\n"
							},
							{
								"title": "Dolor Ullamco",
								"description": "Fugiat quis amet duis non nulla deserunt cupidatat sunt ullamco elit Lorem. Sunt esse voluptate amet ipsum excepteur duis ex anim do ut proident enim ut. Sunt adipisicing ea labore Lorem ipsum nisi adipisicing deserunt ut ex eiusmod. Et eiusmod sunt officia exercitation. Dolore magna deserunt qui ad.\r\n"
							}
						]
					);
	
					response.json(collection);
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
