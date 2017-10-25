const assert = require('assert')
const getSearchParams = require('../src/libs/getSearchParams')

describe('getSearchParams', function () {

	describe('should return empty object if message is not string', function () {
		it('#array', function () {
			assert.deepStrictEqual(getSearchParams([]), {})
		})
		it('#object', function () {
			assert.deepStrictEqual(getSearchParams({}), {})
		})
		it('#number', function () {
			assert.deepStrictEqual(getSearchParams(1), {})
		})
		it('#empty string', function () {
			assert.deepStrictEqual(getSearchParams(''), {})
		})
		it('#undefined string', function () {
			assert.deepStrictEqual(getSearchParams(), {})
		})
	})

	describe('Genre', function () {
		var tests = [
			{message: 'адрама',
				expected: ''},
			{message: 'драма',
				expected: '8'},
			{message: 'адрам',
				expected: ''},
			{message: 'крутая драма',
				expected: '8'},
			{message: 'драма крутая',
				expected: '8'},
			{message: 'крутая драма крутая',
				expected: '8'},
			{message: 'крутая драма крутая сенен',
				expected: '8,27'},
			{message: 'крутая драма крутая сенен ай',
				expected: '8,27'},
			{message: 'крутая драма крутаясенен ай',
				expected: '8'},
			{message: 'крутая драма крутая сененай',
				expected: '8,28'},
			{message: 'крутая драма крутая сенен-ай',
				expected: '8,28'},
			{message: 'крутая драма крутая военный сенен-ай ',
				expected: '8,28,38'},
			{message: 'крутая драма крутаявоенный сенен-ай',
				expected: '8,28'},
		]

		tests.forEach(function (test) {
			it(`Text: "${test.message}" should parsed as "${test.expected}"`, function () {
				const res = getSearchParams(test.message)
				if (!res.genre)
					res.genre = []
				assert.equal(res.genre.map(g => g.id).join(','), test.expected)
			})
		})
	})

	describe('Type', function () {
		var tests = [
			{message: 'фильм',
				expected: 'movie'},
			{message: 'сериал',
				expected: 'tv'},
			{message: 'фильм или сериал',
				expected: 'tv,movie'},
			{message: 'ова',
				expected: 'ova'},
			{message: 'все ona',
				expected: 'ona'},
		]

		tests.forEach(function (test) {
			it(`Text: "${test.message}" should parsed as "${test.expected}"`, function () {
				const res = getSearchParams(test.message)
				if (!res.type)
					res.type = []
				assert.equal(res.type.map(g => g.id).join(','), test.expected)
			})
		})
	})

	describe('Order', function () {
		var tests = [
			{message: 'Топ 10',
				expected: 'popularity'},
			{message: 'Лучшие',
				expected: 'popularity'},
			{message: 'Самые крутые',
				expected: 'popularity'},
			{message: 'Весёлые',
				expected: undefined},
			{message: 'Любые',
				expected: 'random'},
			{message: 'случайнык',
				expected: 'random'},
			{message: 'Самыекрутые',
				expected: 'popularity'},
		]

		tests.forEach(function (test) {
			it(`Text: "${test.message}" should parsed as "${test.expected}"`, function () {
				const res = getSearchParams(test.message)
				if (!res.order)
					res.order = {}
				assert.equal(res.order.id, test.expected)
			})
		})
	})

	describe('Limit', function () {
		var tests = [
			{message: 'Топ 10',
				expected: '10'},
			{message: 'Лучшие 15',
				expected: '15'},
			{message: '10-20 аниме',
				expected: '10'},
			{message: '2000',
				expected: undefined},
			{message: '90-х',
				expected: undefined},
		]

		tests.forEach(function (test) {
			it(`Text: "${test.message}" should parsed as "${test.expected}"`, function () {
				const res = getSearchParams(test.message)
				assert.equal(res.limit, test.expected)
			})
		})
	})

	describe('Season', function () {
		var tests = [
			{message: '2000 год',
				expected: '2000'},
			{message: '2000 или 2017',
				expected: '2000,2017'},
			{message: '1990-2000',
				expected: '1990-2000'},
			{message: '199, 200, 3015, 1760',
				expected: ''},
		]

		tests.forEach(function (test) {
			it(`Text: "${test.message}" should parsed as "${test.expected}"`, function () {
				const res = getSearchParams(test.message)
				if (!res.season)
					res.season = []
				assert.equal(res.season.join(','), test.expected)
			})
		})
	})

	describe('Rating', function () {
		var tests = [
			{message: 'g',
				expected: 'g'},
			{message: 'с рейтингом pg',
				expected: 'pg'},
			{message: 'аниме 0+',
				expected: 'g'},
			{message: 'g или 0+',
				expected: 'g'},
			{message: '13+или 18+',
				expected: 'r_plus'},
			{message: '13.',
				expected: ''},
			{message: '13-18+',
				expected: ''},
		]

		tests.forEach(function (test) {
			it(`Text: "${test.message}" should parsed as "${test.expected}"`, function () {
				const res = getSearchParams(test.message)
				if (!res.rating)
					res.rating = []
				assert.equal(res.rating.map(g => g.id).join(','), test.expected)
			})
		})
	})
})