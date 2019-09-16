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

const NPM_MODULES_DIR = path.resolve(__dirname, "./node_modules/");
const BOOTSTRAP_PUBLIC_DIR = path.resolve(NPM_MODULES_DIR, "./bootstrap/dist/");
const JQUERY_PUBLIC_DIR = path.resolve(NPM_MODULES_DIR, "./jquery/dist/");
const PUBLIC_DIR = path.resolve(__dirname, "./webapp/");
const VIEW_DIR = path.resolve(__dirname, "./views");

let app = express();
let log = debug("library:app");

app.set("view engine", VIEW_ENGINE);
app.set("views", VIEW_DIR);

/* @middleware */
app.use(express.static(PUBLIC_DIR));
app.use(express.static(BOOTSTRAP_PUBLIC_DIR));
app.use("/js", express.static(JQUERY_PUBLIC_DIR));
app.use(morgan("dev"));

/* @routes */
app.get("/", function(request, response) {
	log(chalk.green(messages.onrequest.get));
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
