module.exports = (function() {
	/* @imports */
	let ServerMessages = require("$app/messages/impl/server.messages");

	let chalk = require("chalk");
	let debug = require("debug");
	let util = require("util");

	/* @constants */
	const OF_TYPE_SERVER = "server";

	/* @globals */
	let log = debug("library:$app/messages/message.class");

	return class {
		constructor() {
			let serverMessages = new ServerMessages();
			this.messages = {
				[OF_TYPE_SERVER]: serverMessages
			};
		}

		format(key, ...args) {
			let messages = this.messages,
				keytype = this._keytype(key);
			return util.format(messages[keytype][key], ...args);
		}

		_keytype(key) {
			return ((key.includes("."))
				? key.substr(0, key.indexOf(".")) : key);
		}
	};
})();
