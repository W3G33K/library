/* @imports */
let messages = require("./resources/message-bundle.json");
let package = require("./package.json");

let chalk = require("chalk");
let debug = require("debug");
let express = require("express");
let morgan = require("morgan");
let path = require("path");

/* @globals */
const VIEW_ENGINE = "ejs";
const VIEW_ENGINE_DIR = path.resolve(__dirname, "./views");

let app = express();
let log = debug("library:app");

app.set("view engine", VIEW_ENGINE);
app.set("views", VIEW_ENGINE_DIR);

/* @middleware */
app.use(morgan("dev"));

/* @routes */
app.get("/*", function(request, response) {
	let title = `${package.name}-${package.version}`,
		description = package.description;
	response.render("index", {
		title: title,
		description: description
	});
});

app.listen(3000, function() {
	log(chalk.green(messages.app.listen));
});
