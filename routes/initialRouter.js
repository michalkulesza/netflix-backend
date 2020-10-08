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
		const movieGenres = axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`);
		const tvGenres = axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.API_KEY}`);
		const baseUrl = axios.get(`https://api.themoviedb.org/3/configuration?api_key=${process.env.API_KEY}`);

		const popular = axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`);
		const top_rated = axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}`);
		const trending = axios.get(`https://api.themoviedb.org/3/trending/films/week?api_key=${process.env.API_KEY}`);

		axios
			.all([movieGenres, tvGenres, baseUrl, popular, top_rated, trending])
			.then(
				axios.spread((...responses) => {
					const movieGenres = responses[0];
					const tvGenres = responses[1];
					const genres = [...movieGenres.data.genres, ...tvGenres.data.genres];
					const baseUrl = responses[2].data.images.base_url;

					const popular = appendMediaType(
						appendBaseUrl(decodeGenres(responses[3].data.results, genres), baseUrl),
						"movie"
					);

					const top_rated = appendMediaType(
						appendBaseUrl(decodeGenres(responses[4].data.results, genres), baseUrl),
						"movie"
					);

					const trending = appendMediaType(
						appendBaseUrl(decodeGenres(responses[5].data.results, genres), baseUrl),
						"movie"
					);

					res.send([{ popular }, { top_rated }, { trending }]);
				})
			)
			.catch(err => console.log(err.message));
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

//Initial series data
router.get("/series", async (req, res) => {
	console.log("REQUEST /SERIES");
	try {
		const movieGenres = axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`);
		const tvGenres = axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.API_KEY}`);
		const baseUrl = axios.get(`https://api.themoviedb.org/3/configuration?api_key=${process.env.API_KEY}`);

		const popular = axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}`);
		const top_rated = axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}`);
		const on_the_air = axios.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.API_KEY}`);
		const discover = axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.API_KEY}`);

		axios
			.all([movieGenres, tvGenres, baseUrl, popular, top_rated, on_the_air, discover])
			.then(
				axios.spread((...responses) => {
					const movieGenres = responses[0];
					const tvGenres = responses[1];
					const genres = [...movieGenres.data.genres, ...tvGenres.data.genres];
					const baseUrl = responses[2].data.images.base_url;

					const popular = appendMediaType(
						appendBaseUrl(decodeGenres(responses[3].data.results, genres), baseUrl),
						"tv"
					);

					const top_rated = appendMediaType(
						appendBaseUrl(decodeGenres(responses[4].data.results, genres), baseUrl),
						"tv"
					);

					const on_the_air = appendMediaType(
						appendBaseUrl(decodeGenres(responses[5].data.results, genres), baseUrl),
						"tv"
					);

					const discover = appendMediaType(
						appendBaseUrl(decodeGenres(responses[6].data.results, genres), baseUrl),
						"tv"
					);

					res.send([{ popular }, { top_rated }, { on_the_air }, { discover }]);
				})
			)
			.catch(err => {
				res.status(500).json({ error: err.message });
				console.log(err.message);
			});
	} catch (err) {
		res.status(500).json({ error: err.message });
		err => console.log(err.message);
	}
});

//Initial films data
router.get("/films", async (req, res) => {
	console.log("REQUEST /FILMS");
	try {
		const movieGenres = axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`);
		const tvGenres = axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.API_KEY}`);
		const baseUrl = axios.get(`https://api.themoviedb.org/3/configuration?api_key=${process.env.API_KEY}`);

		const popular = axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`);
		const top_rated = axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}`);
		const trending = axios.get(`https://api.themoviedb.org/3/trending/films/week?api_key=${process.env.API_KEY}`);
		const discover = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}`);

		axios
			.all([movieGenres, tvGenres, baseUrl, popular, top_rated, trending, discover])
			.then(
				axios.spread((...responses) => {
					const movieGenres = responses[0];
					const tvGenres = responses[1];
					const genres = [...movieGenres.data.genres, ...tvGenres.data.genres];
					const baseUrl = responses[2].data.images.base_url;

					const popular = appendMediaType(
						appendBaseUrl(decodeGenres(responses[3].data.results, genres), baseUrl),
						"movie"
					);

					const top_rated = appendMediaType(
						appendBaseUrl(decodeGenres(responses[4].data.results, genres), baseUrl),
						"movie"
					);

					const trending = appendMediaType(
						appendBaseUrl(decodeGenres(responses[5].data.results, genres), baseUrl),
						"movie"
					);

					const discover = appendMediaType(
						appendBaseUrl(decodeGenres(responses[6].data.results, genres), baseUrl),
						"movie"
					);
					res.send([{ popular }, { top_rated }, { trending }, { discover }]);
				})
			)
			.catch(err => {
				res.status(500).json({ error: err.message });
				console.log(err.message);
			});
	} catch (err) {
		res.status(500).json({ error: err.message });
		err => console.log(err.message);
	}
});

module.exports = router;
