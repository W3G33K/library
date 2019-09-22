let jasmineSpecReporter = require("jasmine-spec-reporter");
let SpecReporter = jasmineSpecReporter.SpecReporter;

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new SpecReporter({
	spec: {
		displayPending: true
	}
}));
