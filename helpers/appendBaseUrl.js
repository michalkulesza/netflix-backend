const axios = require("axios");

const appendBaseUrl = async videosArr => {
	try {
		const baseUrl = await axios
			.get(`https://api.themoviedb.org/3/configuration?api_key=${process.env.API_KEY}`)
			.then(response => response.data.images.base_url);
		return videosArr.forEach(video => {
			Object.assign(video, { poster_url_300: `${baseUrl}w300${video.poster_path}` }),
				Object.assign(video, { poster_url_500: `${baseUrl}w500${video.poster_path}` });
		});
	} catch (error) {
		console.error(`Error appending base URL: ${error.message}`);
	}
};

module.exports = appendBaseUrl;
