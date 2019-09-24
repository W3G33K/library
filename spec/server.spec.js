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
				expect(body).toContain("<meta name=\"application-name\" content=\"Book Library\"");
				expect(body).toContain("<title>Home :: Book Library");
				expect(body).toContain("<script type=\"text/javascript\" src=\"/js/greet.js\"></script>");
				done();
			});
		});
	});

	describe("HTTP GET /books", function() {
		it("should return status code 200", function(done) {
			request.get(REQUEST_BASE_URI.concat("books"), function(error, response, body) {
				expect(response.statusCode).toBe(HTTP_STATUS_OK);
				done();
			});
		});

		it("should return text/html", function(done) {
			request.get(REQUEST_BASE_URI.concat("books"), function(error, response, body) {
				expect(response.headers["content-type"]).toEqual("text/html; charset=utf-8");
				expect(body).toContain("<meta name=\"application-name\" content=\"Book Library\"");
				expect(body).toContain("<title>Books :: Book Library");
				expect(body).not.toContain("<script type=\"text/javascript\" src=\"/js/greet.js\"></script>");
				done();
			});
		});
	});

	describe("HTTP GET /books/book/1", function() {
		it("should return status code 200", function(done) {
			request.get(REQUEST_BASE_URI.concat("books/book/1"), function(error, response, body) {
				expect(response.statusCode).toBe(HTTP_STATUS_OK);
				done();
			});
		});

		it("should return text/html", function(done) {
			request.get(REQUEST_BASE_URI.concat("books/book/1"), function(error, response, body) {
				expect(response.headers["content-type"]).toEqual("text/html; charset=utf-8");
				expect(body).toContain("<meta name=\"application-name\" content=\"Book Library\"");
				expect(body).toContain("<title>Book Title :: Book Library");
				expect(body).toContain("<dd>1</dd>");
				expect(body).not.toContain("<script type=\"text/javascript\" src=\"/js/greet.js\"></script>");
				done();
			});
		});
	});
});
