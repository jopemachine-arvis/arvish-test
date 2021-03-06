/* eslint-disable camelcase */
'use strict';
const fse = require('fs-extra');
const execa = require('execa');
const findUp = require('find-up');
const tempy = require('tempy');
const Conf = require('conf');
const CacheConf = require('cache-conf');
const jsonParse = require('parse-json');
const env = require('./lib/env');
const { ArvishTestError } = require('./lib/error');

const replaceAll = (str, search, replace) => {
	return str.split(search).join(replace);
}

const applyVarsToScript = (script, vars) => {
	if (!vars) return script;

	for (const key of Object.keys(vars)) {
		const newStr = vars[key].split(' ').filter((str) => str).join('\\ ');
		script = replaceAll(script, `'{${key}}'`, newStr);
		script = replaceAll(script, `"{${key}}"`, newStr);
		script = replaceAll(script, `{${key}}`, newStr);
		script = replaceAll(script, `"${key}"`, newStr);
		script = replaceAll(script, `'${key}'`, newStr);
	}
	return script;
}

module.exports = options => {
	options = {
		...options,
		extension_data: tempy.directory(),
		extension_cache: tempy.directory()
	};

	const arvishTest = async (script) => {
		if (!script) {
			throw new AlfyTestError('Set script to test.');
		}

		script = applyVarsToScript(script, options.vars);

		const filePath = await findUp([
			'arvis-workflow.json',
			'arvis-plugin.json'
		], {
			allowSymlinks: false,
			type: 'file'
		});

		const info = jsonParse(await fse.readFile(filePath, 'utf8'));

		info.type = info.commands ? 'workflow' : 'plugin';
		info.data = options.extension_data;
		info.cache = options.extension_cache;

		// Assume in other os, node path is given in PATH.
		const { stdout } = await execa.command(script, {
			env: env(info, options.envs),
			preferLocal: true,
			localDir: __dirname
		});

		try {
			return jsonParse(stdout).items;
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
