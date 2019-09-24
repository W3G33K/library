module.exports = (function() {
	/* @imports */
	let config = require("$src/config.json");

	let chalk = require("chalk");
	let debug = require("debug");

	/* @globals */
	let log = debug("library:$app/utils/tag.utils");

	return class {
		static description(supressTags) {
			let description = config.description;

			let html;
			if (typeof description === "string" && description.trim() !== "") {
				html = description;
			}

			if (supressTags !== true) {
				html = `<p class="lead text-muted" id="desc">${html}</p>`;
			}

			return html;
		}

		static title(subtitle, supressTags) {
			let title = config.title,
				separator = config.separator;

			let html;
			if (typeof subtitle === "string" && subtitle.trim() !== "") {
				html = subtitle;
				if ((typeof separator === "string" && separator.trim() !== "") &&
					(typeof title === "string" && title.trim() !== "")) {
					html = `${html}${separator}${title}`;
				 } else if (typeof title === "string" && title.trim() !== "") {
					html = `${html} || ${title}`;
				 }
			} else {
				html = title;
			}

			if (supressTags !== true) {
				html = `<title>${html}</title>`;
			}

			return html;
		}
	};
})();
