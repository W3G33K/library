let messages = require("./resources/message-bundle.json");
let package = require("./package.json");
let express = require("express");

let app = express();

app.get("/*", function(request, response) {
	response.send(`
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<title>${package.name}-${package.version}</title>
			</head>
			<body>
				<h1>${package.name}-${package.version}</h1>
				<p>${package.description}</p>
			</body>
		</html>
	`);
});

app.listen(3000, function() {
	console.info(messages.app.listen);
});
