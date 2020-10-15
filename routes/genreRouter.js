const express = require("express");
const router = express.Router();
const axios = require("axios");
const appendBaseUrl = require("../helpers/appendBaseUrl");

const baseUrl = axios.get(`https://api.themoviedb.org/3/configuration?api_key=${process.env.API_KEY}`);

//Request series data by genre
router.post("/series", async (req, res) => {
	const { genreID, page } = req.body;
	console.log("REQUEST /genre/series", genreID);
	try {
		const genres = axios.get(
			`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.API_KEY}&with_genres=${genreID}&page=${page}`
		);

		axios
			.all([baseUrl, genres])
			.then(
				axios.spread((...responses) => {
					const url = responses[0].data.images.base_url;
					const genres = responses[1];
					const data = appendBaseUrl(responses[1].data.results, url);

					res.send({ data: data, page: genres.data.page, total_pages: genres.data.total_pages });
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
		const genres = axios.get(
			`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&with_genres=${genreID}`
		);

		axios
			.all([baseUrl, genres])
			.then(
				axios.spread((...responses) => {
					const url = responses[0].data.images.base_url;
					const genres = responses[1];
					const data = appendBaseUrl(responses[1].data.results, url);

					res.send({ data: data, page: genres.data.page, total_pages: genres.data.total_pages });
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
