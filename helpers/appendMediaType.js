const appendMediaType = (arr, type) => {
	arr.forEach(video => {
		Object.assign(video, { media_type: type });
	});

	return arr;
};

module.exports = appendMediaType;
