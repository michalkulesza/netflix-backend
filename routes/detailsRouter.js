const express = require("express");
const router = express.Router();
const axios = require("axios");
const appendBaseUrl = require("../helpers/appendBaseUrl");

//Details for movie
router.post("/movie", async (req, res) => {
	console.log("REQUEST /details/movie");
	try {
		const { id } = req.body;

		const details = await axios
			.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`)
			.then(response => response.data);
		await appendBaseUrl([details]);

		const ageRestriction = await axios
			.get(`https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${process.env.API_KEY}`)
			.then(response => response.data.results.filter(obj => obj.iso_3166_1 === "DE")[0].release_dates[0].certification)
			.then(data => (data === "" ? "-" : data));

		const related = await axios
			.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.API_KEY}`)
			.then(response => response.data.results);
		await appendBaseUrl(related);

		const cast = await axios
			.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}`)
			.then(response => response.data.cast);

		res.send({ details: details, ageRestriction: ageRestriction, related: related, cast: cast });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

//Details for tv
router.post("/tv", async (req, res) => {
	console.log("REQUEST /details/tv");
	try {
		const { id } = req.body;

		const details = await axios
			.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.API_KEY}`)
			.then(response => response.data);
		await appendBaseUrl([details]);

		const ageRestriction = await axios
			.get(`https://api.themoviedb.org/3/tv/${id}/content_ratings?api_key=${process.env.API_KEY}`)
			.then(response => response.data.results.filter(obj => obj.iso_3166_1 === "DE")[0].rating)
			.then(data => (data === "" ? "-" : data));

		const related = await axios
			.get(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.API_KEY}`)
			.then(response => response.data.results);
		await appendBaseUrl(related);

		const cast = await axios
			.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.API_KEY}`)
			.then(response => response.data.cast);

		res.send({ details: details, ageRestriction: ageRestriction, related: related, cast: cast });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
