module.exports = (function() {
	/* @imports */
	let messages = require("$src/messages.json");
	let ObjectUtils = require("$app/utils/object.utils");

	let chalk = require("chalk");
	let debug = require("debug");

	/* @globals */
	let log = debug("library:$app/messages/messages.class");

	return class {
		constructor(type) {
			this.type = type;
			this.messages = ObjectUtils.flatten(messages[type], type);
		}
	};
})();
