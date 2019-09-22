module.exports = (function() {
	/* @imports */
	let Messages = require("$app/messages/messages.class");
	let ObjectUtils = require("$app/utils/object.utils");

	let chalk = require("chalk");
	let debug = require("debug");

	/* @globals */
	let log = debug("library:$app/messages/impl/server.messages");

	return class extends Messages {
		constructor() {
			super("server");
		}
	};
})();
