const decodeGenres = (arr, genres) => {
	arr.forEach(
		video =>
			(video.genre_ids = video.genre_ids
				.map(id => genres.find(genre => genre.id === id))
				.map(res => (res ? res.name : "")))
	);
	return arr;
};

module.exports = decodeGenres;
