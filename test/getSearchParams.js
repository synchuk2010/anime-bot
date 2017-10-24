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

	describe('Parse message', function () {
		var tests = [
			{message: 'Сериал',
				expected: { count: 1,
					type: ' tv' }},
			{message: 'Покажи мне сериал',
				expected: { count: 1,
					type: ' tv' }},
			{message: 'Покажи мне 10 лучших сериалов',
				expected: { count: 10,
					type: ' tv' }},
			{message: 'Какой самый популярный фильм?',
				expected: { count: 1,
					type: 'movie' }},
			{message: 'Топ 15 фильмов 90-х годов?',
				expected: { count: 15,
					type: 'movie' }},
		]

		tests.forEach(function (test) {
			it('message ' + test.message + ' correct parsed', function () {
				const res = getSearchParams(test.message)
				assert.equal(res, test.expected)
			})
		})
	})
})