const appendMediaType = arr => {
	arr.forEach(video => {
		Object.assign(video, { media_type: video.name ? "tv" : "movie" });
	});
	return arr;
};

module.exports = appendMediaType;
