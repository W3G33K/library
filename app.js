require("sexy-require");

/* @imports */
let config = require("$src/config.json");
let messages = require("$src/messages.json");

let bookRouter = require("$app/routes/book.routes");

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
const VIEW_ENGINE = "ejs";

/* @globals */
let log = debug("library:app");
let app = express();

app.set("view engine", VIEW_ENGINE);
app.set("views", VIEWS_DIR);

/* @middleware */
app.use(express.static(WEBAPP_DIR));
app.use(express.static(BOOTSTRAP_WEBAPP_DIR));
app.use("/js", express.static(JQUERY_WEBAPP_DIR));
app.use(morgan("dev"));

/* @routes */
app.use("/books", bookRouter);
app.get("/", function(request, response) {
	log(chalk.green(messages.onrequest.get));
	let {title, separator, description} = config;
	response.render("index.view.ejs", {
		title: title,
		separator: separator,
		subtitle: "Home",
		description: description
	});
});

app.listen(ENV_PORT, function() {
	log(chalk.green(messages.app.open), chalk.magenta(messages.app.listen), chalk.cyan(ENV_PORT));
});
