require("sexy-require");

/* @imports */
let initPassport = require("$app/authentication/passport");
let MessageClass = require("$app/messages/message.class");
let TagUtils = require("$app/utils/tag.utils");

let adminRouter = require("$app/routes/admin.routes");
let bookRouter = require("$app/routes/book.routes");
let userRouter = require("$app/routes/user.routes");

let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
let chalk = require("chalk");
let debug = require("debug");
let express = require("express");
let mongodb = require("mongodb");
let morgan = require("morgan");
let passport = require("passport");
let path = require("path");
let session = require("express-session");

/* @constants */
const DB_NAME = "BookLibrary";
const DB_URL = "mongodb://localhost:27017";
const ENV_PORT = process.env.port || "3000";
const VIEW_ENGINE = "ejs";

const MODULES_DIR = path.resolve(__dirname, "./node_modules/");
const BOOTSTRAP_WEBAPP_DIR = path.resolve(MODULES_DIR, "./bootstrap/dist/");
const JQUERY_WEBAPP_DIR = path.resolve(MODULES_DIR, "./jquery/dist/");
const WEBAPP_DIR = path.resolve(__dirname, "./webapp/");

const SRC_DIR = path.resolve(__dirname, "./src/");
const APP_DIR = path.resolve(__dirname, SRC_DIR, "./app/");
const VIEWS_DIR = path.resolve(__dirname, APP_DIR, "./views");

/* @globals */
let MongoClient = mongodb.MongoClient;
let message = new MessageClass();

let log = debug("library:$app");
let app = express();

app.locals.TagUtils = TagUtils;

app.set("view engine", VIEW_ENGINE);
app.set("views", [VIEWS_DIR]);

/* @middleware */
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(cookieParser());
app.use(session({
	secret: "BookLibrary",
	resave: false,
	saveUninitialized: true,
}));

initPassport(app);

app.use(express.static(WEBAPP_DIR));
app.use(express.static(BOOTSTRAP_WEBAPP_DIR));
app.use("/js", express.static(JQUERY_WEBAPP_DIR));

/* @routes */
app.use("/admin", adminRouter);
app.use("/books", bookRouter);
app.use("/users", userRouter);
app.get("/", function(request, response) {
	log(chalk.green(message.format("server.onrequest.get")));
	(async function () {
		let client;
		try {
			client = await MongoClient.connect(DB_URL);
			let db = client.db(DB_NAME);
			let collection = await db.collection("books");
			let cursor = collection.find()
				.sort({_id: -1})
				.limit(3);

			let results = await cursor.toArray();
			response.render("index.view.ejs", {
				subtitle: "Home",
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

app.listen(ENV_PORT, function() {
	log(chalk.green(message.format("server.onlisten", "server1", ENV_PORT)));
});
