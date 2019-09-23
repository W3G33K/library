require("sexy-require");

/* @imports */
let Subject = require("$app/messages/impl/server.messages");

/* @constants */
const OF_TYPE_SERVER = "server";


/* @tests */
describe("library:$app/messages/impl/server.messages", function() {
	it("should not be null or undefined", function() {
		expect(Subject).not.toBeUndefined();
		expect(Subject).not.toBeNull();
	});

	it("should be instanceof", function() {
		let subject = new Subject();
		expect(subject).not.toBeUndefined();
		expect(subject).not.toBeNull();
		expect(subject).toEqual(jasmine.any(Subject));
	});

	it("should contain message keys", function() {
		let subject = new Subject();
		expect(subject).toEqual(jasmine.objectContaining({
			"server.onlisten": "Server %s is open for e-business listening on port %s...",
			"server.onrequest.get": "Handling GET request",
			"server.onrequest.books.book.get": "Handling GET request for Book with a ID %s",
		}));
	});
});
