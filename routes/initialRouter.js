const express = require("express");
const router = express.Router();
const axios = require("axios");
const decodeGenres = require("../helpers/decodeGenres");
const appendBaseUrl = require("../helpers/appendBaseUrl");

//Initial browse data
router.get("/", async (req, res) => {
	try {
		const trending = await axios
			.get(`https://api.themoviedb.org/3/trending/films/week?api_key=${process.env.API_KEY}`)
			.then(response => {
				decodeGenres(response.data.results);
				return response.data.results;
			})
			.then(response => {
				appendBaseUrl(response);
				return response;
			});

		const popular = await axios
			.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`)
			.then(response => {
				decodeGenres(response.data.results);
				return response.data.results;
			});

		const toprated = await axios
			.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}`)
			.then(response => {
				decodeGenres(response.data.results);
				return response.data.results;
			});

		const data = [{ trending }, { popular }, { toprated }];

		res.send([{ trending: trending }]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
