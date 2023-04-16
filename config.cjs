const path = require("path");

/**
 * Object containing paths for the source and lib directories.
 * @typedef {Object} Paths
 * @property {string} src - The path to the source directory.
 * @property {string} lib - The path to the lib directory.
 */

const paths = {
	src: path.resolve(__dirname, "src"),
	lib: path.resolve(__dirname, "lib"),
};

/**
 * Generates the path to an entry file for a module and lecture number.
 * @param {Object} params - An object containing the following properties:
 * - {string} modulePrefix - The prefix for the module directory.
 * - {number} moduleNumber - The module number.
 * - {number} lectureNumber - The lecture number.
 * - {string} entryName - The name of the entry.
 * @returns {string} The path to the entry file for the specified module and lecture.
 */
const getEntryPath = ({ modulePrefix, lectureNumber }) =>
	path.join(paths.src, `${modulePrefix}/lection${lectureNumber}`);

/**
 * Generates an HTML template object for a module and lecture number and entry name.
 * @param {Object} params - An object containing the following properties:
 * - {string} modulePrefix - The prefix for the module directory.
 * - {number} lectureNumber - The lecture number.
 * - {string} entryName - The name of the entry.
 * @returns {Object} An HTML template object for the specified module, lecture, and entry.
 */
const getHtmlTemplate = ({ modulePrefix, lectureNumber, entryName }) => ({
	template: path.join(
		getEntryPath({ modulePrefix, lectureNumber }),
		entryName,
		`${entryName}.html`
	),
	filename: `${entryName}.html`,
	chunks: [entryName],
});

/**
 * Generates an entry object for a module and lecture number and entry name.
 * @param {Object} params - An object containing the following properties:
 * - {string} modulePrefix - The prefix for the module directory.
 * - {number} lectureNumber - The lecture number.
 * - {string} entryName - The name of the entry.
 * @returns {Object} An entry object for the specified module, lecture, and entry.
 */
const getEntry = ({ modulePrefix, lectureNumber, entryName }) =>
	path.join(
		getEntryPath({ modulePrefix, lectureNumber }),
		entryName,
		`${entryName}.ts`
	);

/**
 * Object containing module prefixes.
 * @typedef {Object} ModulePrefixes
 * @property {string} core - The prefix for the core module.
 * @property {string} infrastructure - The prefix for the infrastructure module.
 * @property {string} architecture - The prefix for the architecture module.
 */

/**
 * Object containing entry names.
 * @typedef {Object} EntryNames
 * @property {string} createBitAccessor - entryName.
 * @property {string} canvas -  entryName.
 */

/**
 * Object containing paths, entry generators, and HTML template generators.
 * @typedef {Object} Config
 * @property {Paths} paths - Paths for the source and lib directories.
 * @property {function} getEntry - Function to generate an entry object.
 * @property {function} getHtmlTemplate - Function to generate an HTML template object.
 * @property {ModulePrefixes} modulePrefixes - Object containing module prefixes.
 * @property {EntryNames} entryNames - Object containing entry names.
 */

/**
 * Configuration object for Webpack.
 * @type {Config} Config object for Webpack.
 */
module.exports = {
	paths,
	getEntry,
	getHtmlTemplate,
	modulePrefixes: {
		core: "module_1_core",
		infrastructure: "module_2_infrastructure",
		architecture: "module_3_architecture",
	},
	entryNames: {
		createBitAccessor: "createBitAccessor",
		canvas: "canvas",
	},
};
