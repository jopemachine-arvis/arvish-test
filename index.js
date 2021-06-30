/* eslint-disable camelcase */
'use strict';
const fse = require('fs-extra');
const path = require('path');
const execa = require('execa');
const findUp = require('find-up');
const tempy = require('tempy');
const Conf = require('conf');
const CacheConf = require('cache-conf');
const jsonParse = require('json-parse');
const env = require('./lib/env');
const {ArvishTestError} = require('./lib/error');
const mainFile = require('./lib/main-file');

module.exports = options => {
	options = {
		...options,
		extension_data: tempy.directory(),
		extension_cache: tempy.directory()
	};

	const arvishTest = async (...input) => {
		const filePath = await findUp('arvis-workflow.json');
		const directory = path.dirname(filePath);
		const info = jsonParse(await fse.readFile(filePath, 'utf8'));

		// Detect executable file
		let file = path.join(directory, mainFile(info));
		file = path.relative(process.cwd(), file);

		const {stdout} = await execa('./node_modules/.bin/run-node', [file, ...input], {
			env: env(info, options),
			preferLocal: true,
			localDir: __dirname
		});

		try {
			return JSON.parse(stdout).items;
		} catch (_) {
			throw new ArvishTestError('Could not parse result as JSON', stdout);
		}
	};

	arvishTest.config = new Conf({
		cwd: options.extension_data
	});

	arvishTest.cache = new CacheConf({
		configName: 'cache',
		cwd: options.extension_cache
	});

	return arvishTest;
};
