const express = require("express");
const router = express.Router();
const axios = require("axios");
const decodeGenres = require("../helpers/decodeGenres");
const appendBaseUrl = require("../helpers/appendBaseUrl");
const appendMediaType = require("../helpers/appendMediaType");

//Initial browse data
router.get("/browse", async (req, res) => {
	console.log("REQUEST /");
	try {
		const trending = await axios
			.get(`https://api.themoviedb.org/3/trending/films/week?api_key=${process.env.API_KEY}`)
			.then(response => response.data.results);
		await decodeGenres(trending);
		await appendBaseUrl(trending);

		const top_rated = await axios
			.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}`)
			.then(response => response.data.results);
		await decodeGenres(top_rated);
		await appendBaseUrl(top_rated);
		await appendMediaType(top_rated, "movie");

		const popular = await axios
			.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`)
			.then(response => response.data.results);
		await decodeGenres(popular);
		await appendBaseUrl(popular);
		await appendMediaType(popular, "movie");

		res.send([{ trending }, { top_rated }, { popular }, { top_rated }]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

//Initial browse data
router.get("/series", async (req, res) => {
	console.log("REQUEST /SERIES");
	try {
		const popular = await axios
			.get(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}`)
			.then(response => response.data.results);
		await decodeGenres(popular);
		await appendBaseUrl(popular);
		await appendMediaType(popular, "tv");

		const top_rated = await axios
			.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}`)
			.then(response => response.data.results);
		await decodeGenres(top_rated);
		await appendBaseUrl(top_rated);
		await appendMediaType(top_rated, "tv");

		const on_the_air = await axios
			.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.API_KEY}`)
			.then(response => response.data.results);
		await decodeGenres(on_the_air);
		await appendBaseUrl(on_the_air);
		await appendMediaType(on_the_air, "tv");

		res.send([{ popular }, { top_rated }, { on_the_air }]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
