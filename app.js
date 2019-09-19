/* @imports */
let messages = require("./src/message-bundle.json");
let package = require("./package.json");

let chalk = require("chalk");
let debug = require("debug");
let express = require("express");
let morgan = require("morgan");
let path = require("path");

/* @constants */
const MODULES_DIR = path.resolve(__dirname, "./node_modules/");
const BOOTSTRAP_WEBAPP_DIR = path.resolve(MODULES_DIR, "./bootstrap/dist/");
const JQUERY_WEBAPP_DIR = path.resolve(MODULES_DIR, "./jquery/dist/");
const WEBAPP_DIR = path.resolve(__dirname, "./webapp/");

const SRC_DIR = path.resolve(__dirname, "./src/");
const APP_DIR = path.resolve(__dirname, SRC_DIR, "./app/");
const VIEWS_DIR = path.resolve(__dirname, APP_DIR, "./views");

const ENV_PORT = process.env.port || 3000;
const SCHEME_QUALIFIER = "://";
const VIEW_ENGINE = "ejs";

/* @globals */
let log = debug("library:app");
let app = express();
let bookRouter = express.Router();

app.set("view engine", VIEW_ENGINE);
app.set("views", VIEWS_DIR);

/* @middleware */
app.use(express.static(WEBAPP_DIR));
app.use(express.static(BOOTSTRAP_WEBAPP_DIR));
app.use("/js", express.static(JQUERY_WEBAPP_DIR));
app.use(morgan("dev"));

/* @routes */
bookRouter.route("/")
	.get(function(request, response) {
		log(chalk.green(messages.onrequest.get));
		response.send([request.protocol, SCHEME_QUALIFIER, request.hostname, request.originalUrl].join(""));
	});

bookRouter.route("/:id")
	.get(function(request, response) {
		log(chalk.green(messages.onrequest.books.book.get), chalk.cyan(request.params.id));
		response.send([request.protocol, SCHEME_QUALIFIER, request.hostname, request.originalUrl].join(""));
	});

app.use("/books", bookRouter);
app.get("/", function(request, response) {
	log(chalk.green(messages.onrequest.get));
	let title = `${package.name}-${package.version}`,
		description = package.description;
	response.render("index", {
		title: title,
		description: description
	});
});

app.listen(ENV_PORT, function() {
	log(chalk.green(messages.app.open), chalk.magenta(messages.app.listen), chalk.cyan(ENV_PORT));
});
