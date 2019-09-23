module.exports = (function() {
	/* @imports */
	let messages = require("$src/messages.json");
	let ObjectUtils = require("$app/utils/object.utils");

	let chalk = require("chalk");
	let debug = require("debug");

	/* @globals */
	let log = debug("library:$app/messages/messages.class");

	return class {
		constructor(keytype) {
			let msgs = ObjectUtils.flatten(messages[keytype], keytype);
			Object.assign(this, msgs);
		}
	};
})();
