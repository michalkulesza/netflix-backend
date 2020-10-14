const express = require("express");
const router = express.Router();
const axios = require("axios");

//Request series data by genre
router.post("/series", async (req, res) => {
	const { genreID } = req.body;
	console.log("REQUEST /genre/series", genreID);
	try {
		axios
			.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.API_KEY}&with_genres=${genreID}`)
			.then(response =>
				res.send({ data: response.data.results, page: response.data.page, total_pages: response.data.total_pages })
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
