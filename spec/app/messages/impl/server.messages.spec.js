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

		let subject = new Subject();
		expect(subject).not.toBeUndefined();
		expect(subject).toEqual(jasmine.any(Subject));
	});

	it("should to be of type", function() {
		let subject = new Subject();
		expect(subject.type).toBe(OF_TYPE_SERVER);
	});

	it("should contain message keys", function() {
		let subject = new Subject();
		expect(subject.messages).not.toBeUndefined();
		expect(subject.messages).not.toBeNull();
		expect(subject.messages).toEqual(jasmine.objectContaining({
			"server.onlisten": "Server {0} is open for e-business listening on port {1}...",
			"server.onrequest.get": "Handling GET request",
			"server.onrequest.books.book.get": "Handling GET request for Book with a ID {0}",
		}));
	});
});
