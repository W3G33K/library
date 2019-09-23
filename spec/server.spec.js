/* @imports */
let app = require("../app");

let request = require("request");

/* @constants */
const HTTP_STATUS_OK = 200;
const REQUEST_BASE_URI = "http://localhost:3000/"


/* @tests */
describe("library:$app/server", function() {
	describe("HTTP GET /", function() {
		it("should return status code 200", function(done) {
			request.get(REQUEST_BASE_URI, function(error, response, body) {
				expect(response.statusCode).toBe(HTTP_STATUS_OK);
				done();
			});
		});

		it("should return text/html", function(done) {
			request.get(REQUEST_BASE_URI, function(error, response, body) {
				expect(response.headers["content-type"]).toEqual("text/html; charset=utf-8");
				expect(body).toContain("<title>Home :: Book Library</title>");
				done();
			});
		});
	});
});
