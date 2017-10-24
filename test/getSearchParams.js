const assert = require('assert')
const getSearchParams = require('../src/libs/getSearchParams')
const defaultParams = require('../src/libs/defaultParams')

describe('getSearchParams', function () {
	describe('should throw error if message is not string', function () {
		it('#array', function () {
			assert.throws(() => getSearchParams([]))
		})
		it('#object', function () {
			assert.throws(() => getSearchParams({}))
		})
		it('#number', function () {
			assert.throws(() => getSearchParams(1))
		})
	})

	describe('should return default params if message is not present', function () {
		it('#empty string', function () {
			assert.deepStrictEqual(getSearchParams(''), defaultParams)
		})
		it('#undefined string', function () {
			assert.deepStrictEqual(getSearchParams(), defaultParams)
		})
	})
})