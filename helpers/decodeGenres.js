const axios = require("axios");

const decodeGenres = async videosArr => {
	try {
		const movieGenres = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`);
		const tvGenres = await axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.API_KEY}`);
		const genres = [...movieGenres.data.genres, ...tvGenres.data.genres];

		return videosArr.forEach(
			video =>
				(video.genre_ids = video.genre_ids
					.slice(0, 2)
					.map(item => genres.find(genre => genre.id === item))
					.map(res => res.name))
		);
	} catch (error) {
		console.error(`Error decoding genres: ${error.message}`);
	}
};

module.exports = decodeGenres;
