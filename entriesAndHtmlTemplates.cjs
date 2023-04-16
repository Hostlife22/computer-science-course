const {
	entryNames,
	getEntry,
	getHtmlTemplate,
	modulePrefixes,
} = require("./config.cjs");

const entries = {
	[entryNames.createBitAccessor]: getEntry({
		modulePrefix: modulePrefixes.core,
		lectureNumber: 1,
		entryName: entryNames.createBitAccessor,
	}),
	[entryNames.canvas]: getEntry({
		modulePrefix: modulePrefixes.core,
		lectureNumber: 2,
		entryName: entryNames.canvas,
	}),
};

const htmlTemplates = [
	getHtmlTemplate({
		modulePrefix: modulePrefixes.core,
		lectureNumber: 1,
		entryName: entryNames.createBitAccessor,
	}),
	getHtmlTemplate({
		modulePrefix: modulePrefixes.core,
		lectureNumber: 2,
		entryName: entryNames.canvas,
	}),
];

module.exports = {
	entries,
	htmlTemplates,
};
