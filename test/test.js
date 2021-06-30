const test = require('ava');
const sep = require('path').sep;
const {ArvishTestError} = require('../lib/error');
const makeArvishTest = require('..');

const directory = process.cwd();

test('result', async t => {
	process.chdir(`${directory}${sep}test${sep}fixtures${sep}default`);

	const arvishTest = makeArvishTest();

	t.deepEqual(await arvishTest('node index.js bar'), [
		{
			title: 'Foo',
			subtitle: 'bar'
		}
	]);
});

test('result 2', async t => {
	process.chdir(`${directory}${sep}test${sep}fixtures${sep}main`);

	const arvishTest = makeArvishTest();

	t.deepEqual(await arvishTest('node main.js bar'), [
		{
			title: 'Foo',
			subtitle: 'bar'
		}
	]);
});

// test('cache', async t => {
// 	process.chdir(`${directory}${sep}test${sep}fixtures${sep}cache`);

// 	const arvishTest = makeArvishTest();

// 	t.deepEqual(await arvishTest('node index.js foo'), [
// 		{
// 			title: 'foo',
// 			subtitle: 'bar'
// 		}
// 	]);

// 	t.is(arvishTest.config.get('foo'), 'bar');
// });

test('non-json result', async t => {
	process.chdir(`${directory}${sep}test${sep}fixtures${sep}non-json`);

	const arvishTest = makeArvishTest();

	await t.throwsAsync(arvishTest('node index.js bar'), {
		instanceOf: ArvishTestError,
		message: 'Could not parse result as JSON'
	});
});

// test('environment variables', async t => {

// });
