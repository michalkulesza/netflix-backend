const express = require("express");
const router = express.Router();
const axios = require("axios");
const decodeGenres = require("../helpers/decodeGenres");
const appendBaseUrl = require("../helpers/appendBaseUrl");
const appendMediaType = require("../helpers/appendMediaType");

//Initial browse data
router.get("/", async (req, res) => {
	console.log("REQUEST");
	try {
		const trending = await axios
			.get(`https://api.themoviedb.org/3/trending/films/week?api_key=${process.env.API_KEY}`)
			.then(response => response.data.results);
		await decodeGenres(trending);
		await appendBaseUrl(trending);

		const toprated = await axios
			.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}`)
			.then(response => response.data.results);
		await decodeGenres(toprated);
		await appendBaseUrl(toprated);
		await appendMediaType(toprated, "movie");

		const popular = await axios
			.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`)
			.then(response => response.data.results);
		await decodeGenres(popular);
		await appendBaseUrl(popular);
		await appendMediaType(popular, "movie");

		res.send([{ trending }, { toprated }, { popular }, { toprated }]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
