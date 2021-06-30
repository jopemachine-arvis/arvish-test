'use strict';

class AlfyTestError extends Error {
	constructor(message, result) {
		super(message);
		Error.captureStackTrace(this, this.constructor);
		this.name = 'ArvishTestError';

		Object.assign(this, {result});
	}
}

module.exports.AlfyTestError = AlfyTestError;
