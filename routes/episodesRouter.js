const express = require("express");
const router = express.Router();
const axios = require("axios");
const appendBaseUrl = require("../helpers/appendBaseUrl");

const baseUrl = axios.get(`https://api.themoviedb.org/3/configuration?api_key=${process.env.API_KEY}`);

//Request episodes by season
router.post("/", async (req, res) => {
	const { id, season } = req.body;
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

module.exports = router;
