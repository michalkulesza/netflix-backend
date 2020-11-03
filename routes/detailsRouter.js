const express = require("express");
const router = express.Router();
const axios = require("axios");
const appendBaseUrl = require("../helpers/appendBaseUrl");
const appendMediaType = require("../helpers/appendMediaType");

const baseUrl = axios.get(`https://api.themoviedb.org/3/configuration?api_key=${process.env.API_KEY}`);

//Details for movie
router.get("/movie", async (req, res) => {
	console.log("REQUEST /details/movie");
	try {
		const { id } = req.query;
		const details = axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`);
		const ageRestriction = axios.get(
			`https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${process.env.API_KEY}`
		);
		const related = axios.get(
			`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.API_KEY}`
		);
		const cast = axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}`);

		axios
			.all([baseUrl, details, ageRestriction, related, cast])
			.then(
				axios.spread((...responses) => {
					const baseUrl = responses[0].data.images.base_url;
					const details = appendMediaType([appendBaseUrl([responses[1].data], baseUrl)[0]]);
					const ageRestrictionData = responses[2].data.results.filter(obj => obj.iso_3166_1 === "GB")[0];
					const ageRestriction = ageRestrictionData ? ageRestrictionData.release_dates[0].certification : "-";
					const related = appendBaseUrl(responses[3].data.results, baseUrl);
					const cast = responses[4].data.cast;

					res.send({ details: details[0], ageRestriction, related, cast });
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

//Details for tv
router.get("/tv", async (req, res) => {
	console.log("REQUEST /details/tv");
	try {
		const { id } = req.query;
		const details = axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.API_KEY}`);
		const ageRestriction = axios.get(
			`https://api.themoviedb.org/3/tv/${id}/content_ratings?api_key=${process.env.API_KEY}`
		);
		const related = axios.get(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.API_KEY}`);
		const cast = axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.API_KEY}`);

		axios
			.all([baseUrl, details, ageRestriction, related, cast])
			.then(
				axios.spread((...responses) => {
					const baseUrl = responses[0].data.images.base_url;
					const details = appendMediaType([appendBaseUrl([responses[1].data], baseUrl)[0]]);
					const ageRestrictionData = responses[2].data.results.filter(obj => obj.iso_3166_1 === "GB")[0];
					const ageRestriction = ageRestrictionData ? ageRestrictionData.rating : "-";
					const related = appendBaseUrl(responses[3].data.results, baseUrl);
					const cast = responses[4].data.cast;

					res.send({ details: details[0], ageRestriction, related, cast });
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
