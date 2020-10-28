const express = require("express");
const router = express.Router();
const admin = require("../firebase/admin");
const db = admin.firestore();

//USER DATA
router.get("/user", async (req, res) => {
	console.log("GET REQUEST /data/user");
	const { id } = req.query;

	try {
		db.collection("users")
			.doc(id)
			.get()
			.then(doc => {
				if (doc.exists) {
					res.status(200).send(doc.data());
				} else {
					res.status(500).json({ error: "No data found." });
				}
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
				console.error(err.message);
			});
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.error(err.message);
	}
});

//HANDLE LIKES
router.post("/like", async (req, res) => {
	console.log("POST REQUEST /data/like");
	const { videoID, userID } = req.body;

	try {
		db.collection("users")
			.doc(userID)
			.get()
			.then(doc => {
				doc.ref.set({ liked: admin.firestore.FieldValue.arrayUnion(videoID) });
				doc.ref.set({ disliked: admin.firestore.FieldValue.arrayRemove(videoID) });
			});
		return res.send(200);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.error(err.message);
	}
});

router.delete("/like", async (req, res) => {
	const { likeID, userID } = req.body;

	console.log("DELETE REQUEST /data/like");
	try {
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.error(err.message);
	}
});

module.exports = router;
