require("sexy-require");

/* @imports */
let Subject = require("$app/messages/message.class");

/* @constants */
const OF_TYPE_SERVER = "server";


/* @tests */
describe("library:$app/messages/message.class", function() {
	it("should not be null or undefined", function() {
		expect(Subject).not.toBeUndefined();
		expect(Subject).not.toBeNull();
	});

	it("should be instanceof", function() {
		let subject = new Subject();
		expect(subject).not.toBeUndefined();
		expect(subject).toEqual(jasmine.any(Subject));
	});

	it("should return key type of 'server' when using dot-notation", function() {
		let subject = new Subject();
		let keytype = subject._keytype("server.onlisten");
		expect(keytype).toEqual(OF_TYPE_SERVER);
	});

	it("should return key type of 'server'", function() {
		let subject = new Subject();
		let keytype = subject._keytype("server");
		expect(keytype).toEqual(OF_TYPE_SERVER);
	});

	it("should return a formatted message with varargs", function() {
		let subject = new Subject();
		let message = subject.format("server.onlisten", "server1", "3000");
		expect(message).toEqual("Server server1 is open for e-business listening on port 3000...");
	});
});
