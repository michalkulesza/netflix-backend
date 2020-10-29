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
				if (doc.exists) {
					doc.ref.set({ liked: admin.firestore.FieldValue.arrayUnion(videoID) }, { merge: true });
					doc.ref.set({ disliked: admin.firestore.FieldValue.arrayRemove(videoID) }, { merge: true });
					res.sendStatus(200);
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

router.post("/dislike", async (req, res) => {
	console.log("POST REQUEST /data/dislike");
	const { videoID, userID } = req.body;

	try {
		db.collection("users")
			.doc(userID)
			.get()
			.then(doc => {
				if (doc.exists) {
					doc.ref.set({ disliked: admin.firestore.FieldValue.arrayUnion(videoID) }, { merge: true });
					doc.ref.set({ liked: admin.firestore.FieldValue.arrayRemove(videoID) }, { merge: true });
					res.sendStatus(200);
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

router.post("/list", async (req, res) => {
	console.log("POST REQUEST /data/list");
	const { videoID, userID } = req.body;

	try {
		db.collection("users")
			.doc(userID)
			.get()
			.then(doc => {
				if (doc.exists) {
					const list = doc.data().list;
					if (!list.includes(videoID)) {
						doc.ref.set({ list: admin.firestore.FieldValue.arrayUnion(videoID) }, { merge: true });
					} else {
						doc.ref.set({ list: admin.firestore.FieldValue.arrayRemove(videoID) }, { merge: true });
					}
					res.sendStatus(200);
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

module.exports = router;
