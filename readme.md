# arvish-test ![CI](https://github.com/SamVerschueren/arvish-test/workflows/CI/badge.svg)

> Test your [Arvish](https://github.com/jopemachine/arvish) workflows

This lib is inspired and cloned from [alfy-test](https://github.com/SamVerschueren/alfy-test)

## Install

```
$ npm install arvish-test
```

## Usage

```js
import test from 'ava';
import arvishTest from 'arvish-test';

test('foo', async t => {
	const arvish = arvishTest();

	const result = await arvish('workflow input');

	t.deepEqual(result, [
		{
			title: 'foo',
			subtitle: 'bar'
		}
	]);
});
```

## API

### alfyTest(options?)

Returns an [alfy](#alfyinput) instance.

### options

Type: `object`

#### userConfig

Type: `object`

A JSON object representing the user configuration.

#### version

Type: `string`\
Default: `'3.0.3'`

Alfred version.

### arvish(...input)

Returns a `Promise` that returns the `items` of the workflow.

#### input

Type: `string[]`

Workflow input.

#### .config

The [arvish config](https://github.com/jopemachine/arvish) instance.

#### .cache

The [arvish cache](https://github.com/jopemachine/arvish) instance.
