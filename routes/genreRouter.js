const express = require("express");
const router = express.Router();
const axios = require("axios");
const appendBaseUrl = require("../helpers/appendBaseUrl");
const decodeGenres = require("../helpers/decodeGenres");
const appendMediaType = require("../helpers/appendMediaType");

const baseUrl = axios.get(`https://api.themoviedb.org/3/configuration?api_key=${process.env.API_KEY}`);

//Request series data by genre
router.post("/series", async (req, res) => {
	const { genreID, page } = req.body;
	console.log("REQUEST /genre/series", genreID);
	try {
		const genresData = axios.get(
			`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.API_KEY}&with_genresData=${genreID}&page=${page}`
		);
		const genresMap = axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.API_KEY}`);

		axios
			.all([baseUrl, genresData, genresMap])
			.then(
				axios.spread((...responses) => {
					const url = responses[0].data.images.base_url;
					const genresData = responses[1];
					const genresMap = responses[2].data.genres;
					const data = appendMediaType(decodeGenres(appendBaseUrl(responses[1].data.results, url), genresMap), "tv");

					res.send({ data: data, page: genresData.data.page, total_pages: genresData.data.total_pages });
				})
			)
			.catch(err => {
				res.status(500).json({ error: err.message });
				console.log(err.message);
			});
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log(err.message);
	}
});

//Request films data by genre
router.post("/films", async (req, res) => {
	const { genreID } = req.body;
	console.log("REQUEST /genre/films", genreID);
	try {
		const genresData = axios.get(
			`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&with_genres=${genreID}`
		);
		const genresMap = axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`);

		axios
			.all([baseUrl, genresData, genresMap])
			.then(
				axios.spread((...responses) => {
					const url = responses[0].data.images.base_url;
					const genresData = responses[1];
					const genresMap = responses[2].data.genres;
					const data = appendMediaType(decodeGenres(appendBaseUrl(responses[1].data.results, url), genresMap), "movie");

					res.send({ data: data, page: genresData.data.page, total_pages: genresData.data.total_pages });
				})
			)
			.catch(err => {
				res.status(500).json({ error: err.message });
				console.log(err.message);
			});
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log(err.message);
	}
});

module.exports = router;
