# arvish-test

[![BuildStatus](https://api.travis-ci.com/jopemachine/arvish-test.svg)](https://www.npmjs.com/package/arvish-test)
[![NPM download total](https://img.shields.io/npm/dt/arvish-test)](http://badge.fury.io/js/arvish-test)
[![NPM version](https://badge.fury.io/js/arvish-test.svg)](http://badge.fury.io/js/arvish-test)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
[![PR's Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)

> Test your [arvish](https://github.com/jopemachine/arvish) extensions

This lib is inspired and cloned from [alfy-test](https://github.com/SamVerschueren/alfy-test).

If you're trying to use this lib, please note that **API is different** from [alfy-test](https://github.com/SamVerschueren/alfy-test).

* Some environment variables are not supported yet. You could check which envs is supported on [here](https://github.com/jopemachine/arvish-test/blob/master/lib/env.js)

* XML scriptfilter not supported.


## Install

```
$ npm install --save-dev arvish-test
```

## Usage

```js
// Note: API is different from 'alfy-test'.
import test from 'ava';
import arvishTest from 'arvish-test';

test('foo', async t => {
	const arvish = arvishTest({
		vars: {
			query: 'foo bar'
		}
	});

	// Below script is replaced with "node index.js foo\\ bar"
	const result = await arvish("node index.js {query}");

	t.deepEqual(result, [
		{
			title: 'foo',
			subtitle: 'bar'
		}
	]);
});
```

## API

### arvishTest(options?)

Returns an mock arvish instance.

### options

Type: `object`

#### version

Type: `string`\
Default: `arvish-test`

Arvis version.

#### env

Type: `object`\

You can put unsupported environment variables values through `env`

#### vars

Type: `object`\

You can put `query` or other variables `vars`

### arvish(script)

Returns a `Promise` that returns the `items` of the workflow.

#### script

Type: `string`

Script to test.

#### .config

The [arvish config](https://github.com/jopemachine/arvish) instance.

#### .cache

The [arvish cache](https://github.com/jopemachine/arvish) instance.


## Related

- [arvish](https://github.com/jopemachine/arvish) - Arvis workflow, plugin creator tools