const express = require("express");
const router = express.Router();
const axios = require("axios");
const appendBaseUrl = require("../helpers/appendBaseUrl");

const baseUrl = axios.get(`https://api.themoviedb.org/3/configuration?api_key=${process.env.API_KEY}`);

//Request episodes by season
router.get("/", async (req, res) => {
	const { id, season } = req.query;
	console.log("REQUEST /episodes");
	try {
		const episodes = axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${process.env.API_KEY}`);

		axios
			.all([episodes, baseUrl])
			.then(
				axios.spread((...responses) => {
					const baseUrl = responses[1].data.images.base_url;
					const data = responses[0].data.episodes;
					const episodes = appendBaseUrl(data, baseUrl);
					res.send(episodes);
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

//Request all episodes and seasons
router.get("/all", async (req, res) => {
	const { id } = req.query;
	console.log("REQUEST /episodes/all");
	try {
		const tvDetails = axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.API_KEY}`);

		axios
			.all([tvDetails])
			.then(
				axios.spread(async (...responses) => {
					const seasonsNum = responses[0].data.number_of_seasons;
					let data = [];

					for (let i = 1; i <= seasonsNum; i++) {
						const season = await axios
							.get(`https://api.themoviedb.org/3/tv/${id}/season/${i}?api_key=${process.env.API_KEY}`)
							.then(res => res.data);

						data = [...data, season];
					}

					res.send(data);
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
