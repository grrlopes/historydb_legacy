const _ = require('lodash');

function queryCheckbox(value) {
	const checkBox = [];
	const objSearch = [];
	const search = value.search;

	_.forEach(value, (v, k) => {
		checkBox.push(k)
	});

	checkBox.map((index) => {
		switch (index) {
			case 'author':
				objSearch.push({ author: { "$regex": search, "$options": "im" } });
				break;
			case 'definition':
				objSearch.push({ definition: { "$regex": search, "$options": "im" } })
				break;
			case 'title':
				objSearch.push({ title: { "$regex": search, "$options": "im" } })
				break;
			case 'command':
				objSearch.push({ command: { "$regex": search, "$options": "im" } })
				break;
			default:
				break;
		}
	});
	return objSearch;
}

module.exports = {
	queryCheckbox
}