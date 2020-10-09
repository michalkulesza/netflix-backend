const appendBaseUrl = (arr, baseUrl) => {
	arr.forEach(video => {
		if (video.backdrop_path) {
			video.backdrop_path_500 = `${baseUrl}w500${video.backdrop_path}`;
			video.backdrop_path_1280 = `${baseUrl}w1280${video.backdrop_path}`;
		}

		if (video.poster_path) {
			Object.assign(video, { poster_path_300: `${baseUrl}w300${video.poster_path}` }),
				Object.assign(video, { poster_path_500: `${baseUrl}w500${video.poster_path}` });
		}

		if (video.still_path) {
			Object.assign(video, { still_path_300: `${baseUrl}w300${video.still_path}` }),
				Object.assign(video, { still_path_500: `${baseUrl}w500${video.still_path}` });
		}

		return null;
	});
	return arr;
};

module.exports = appendBaseUrl;
