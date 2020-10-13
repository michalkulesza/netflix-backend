const express = require("express");
const router = express.Router();
const axios = require("axios");

//Request series genres
router.get("/series", async (_, res) => {
	console.log("REQUEST /genres/series");
	try {
		const genres = await axios
			.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.API_KEY}`)
			.then(response => response.data.genres)
			.catch(err => {
				res.status(500).json({ error: err.message });
				console.log(err.message);
			});

		res.status(200).send(genres);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log(err.message);
	}
});

//Request films genres
router.get("/films", async (_, res) => {
	console.log("REQUEST /genres/films");
	try {
		const genres = await axios
			.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`)
			.then(response => response.data.genres)
			.catch(err => {
				res.status(500).json({ error: err.message });
				console.log(err.message);
			});

		res.status(200).send(genres);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log(err.message);
	}
});

module.exports = router;
