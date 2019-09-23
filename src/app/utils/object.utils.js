module.exports = (function() {
	/* @imports */
	let chalk = require("chalk");
	let debug = require("debug");

	/* @globals */
	let log = debug("library:$app/utils/object.utils");

	function deflate(object, keyType, propertyName, results) {
		let flatObject = this.flatten(object[propertyName]);
		for (let flatPropertyName in flatObject) {
			if (flatObject.hasOwnProperty(flatPropertyName)) {
				let key = ((typeof keyType === "string") 
					? `${keyType}.${propertyName}.${flatPropertyName}` : `${propertyName}.${flatPropertyName}`);
				results[key] = flatObject[flatPropertyName];
			}
		}
	}

	return class {
		static flatten(object, keyType) {
			if (typeof object === "object" && object === null) {
				throw new TypeError("Object type must of type object.");
			}

			let results = Object.create(Object.prototype);
			for (let propertyName in object) {
				if (object.hasOwnProperty(propertyName)) {
					if (typeof object[propertyName] === "object") {
						deflate.call(this, object, keyType, propertyName, results);
					} else {
						let key = ((typeof keyType === "string") 
							? `${keyType}.${propertyName}` : `${propertyName}`);
						results[key] = object[propertyName];
					}
				}
			}

			return results;
		}
	};
})();
