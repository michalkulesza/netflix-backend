const express = require("express");
const router = express.Router();
const axios = require("axios");
const appendBaseUrl = require("../helpers/appendBaseUrl");

//Request episodes by season
router.post("/", async (req, res) => {
	const { id, season } = req.body;
	console.log("REQUEST /episodes");
	try {
		const episodes = await axios
			.get(`https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${process.env.API_KEY}`)
			.then(response => response.data);

		await appendBaseUrl(episodes.episodes);

		res.send(episodes);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
