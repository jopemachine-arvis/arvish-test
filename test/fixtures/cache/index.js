'use strict';
const arvish = require('arvish');

if (arvish.input === 'foo') {
	arvish.config.set('foo', 'bar');
}

arvish.output([
	{
		title: arvish.input,
		subtitle: arvish.config.get(arvish.input)
	}
]);
