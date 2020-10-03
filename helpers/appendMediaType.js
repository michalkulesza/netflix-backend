const appendMediaType = async (videosArr, type) => {
	try {
		return videosArr.forEach(video => {
			Object.assign(video, { media_type: type });
		});
	} catch (error) {
		console.error(`Error appending media type: ${error.message}`);
	}
};

module.exports = appendMediaType;
