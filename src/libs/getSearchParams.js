const defaultParams = require('./defaultParams')

module.exports = function (str) {
	if (str === undefined || str === '') {
		return defaultParams
	}
	if (typeof str !== 'string') {
		throw new Error('Message must be a string, got ' + typeof str)
	}

	return {}
}