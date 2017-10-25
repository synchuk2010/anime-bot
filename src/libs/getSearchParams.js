const db = require('./database')
const XRegExp = require('xregexp')
XRegExp.addToken(/\\b/, () => '(?:^|$|[^a-zA-Zа-яА-Я0-9-])')

module.exports = function (message) {
	const result = {}

	if (!message || typeof message !== 'string') {
		return result
	}

	// Определение названия
	XRegExp.replace(message, XRegExp('\\b"(?<name>[^"]+)"\\b', 'ng'), match => {
		if (match.name && !result.search) {
			result.search = match.name
		}
		return ''
	})

	// Определение сюжета
	// Очень не надёжный способ !
	// TODO: придумать как не включать в это поле всё подряд
	if (!result.search) {
		const match = XRegExp.exec(message, XRegExp('\\bпро\\b(?<search>.+)\\b', 'ni'))
		if (match && match.search) {
			result.search = match.search
		}
	}

	// Поиск соотведствий по жанрам
	db.genres
		.map(genre => {
			if (!genre.trigger[1]) {
				genre.trigger[1] = 'ni'
			}
			genre.trigger.regExp = XRegExp(...genre.trigger)
			return genre
		})
		.forEach(genre => {
			if (genre.trigger.regExp.test(message)) {
				if (!result.genre)
					result.genre = []
				result.genre.push(genre)
			}
		})

	// Поиск соотведствий по типам
	db.types
		.map(type => {
			if (!type.trigger[1]) {
				type.trigger[1] = 'ni'
			}
			type.trigger.regExp = XRegExp(...type.trigger)
			return type
		})
		.forEach(type => {
			if (type.trigger.regExp.test(message)) {
				if (!result.type)
					result.type = []
				result.type.push(type)
			}
		})

	// Определение сортировки
	db.orders
		.map(order => {
			if (!order.trigger[1]) {
				order.trigger[1] = 'ni'
			}
			order.trigger.regExp = XRegExp(...order.trigger)
			return order
		})
		.forEach(order => {
			if (order.trigger.regExp.test(message)) {
				result.order = order
			}
		})

	// Определение количества
	let limit = message.match(/\b[0-9]{1,2}\b/ig)
	if (limit && limit.length > 0) {
		limit = limit.filter(num => num <= 50)
		if (limit.length > 0)
			result.limit = limit[0]
	}

	// Определение год релиза
	let seasons = XRegExp.match(message, XRegExp('\\b(19|20)[0-9]{2}(-(19|20)[0-9]{2})?\\b', 'nig'))
	if (seasons && seasons.length > 0) {
		result.season = seasons.map(s => s.trim())
	}


	// Определение возрастных ограничений
	db.ratings
		.map(rating => {
			if (!rating.trigger[1]) {
				rating.trigger[1] = 'ni'
			}
			rating.trigger.regExp = XRegExp(...rating.trigger)
			return rating
		})
		.forEach(rating => {
			if (rating.trigger.regExp.test(message)) {
				if (!result.rating)
					result.rating = []
				result.rating.push(rating)
			}
		})

	return result
}