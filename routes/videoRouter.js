const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/formula1", async (req, res) => {
	res.sendFile(path.resolve("assets/formula1_trailer.mp4"));
});

router.get("/formula1/logo", async (req, res) => {
	res.sendFile(path.resolve("assets/formula1_logo.png"));
});

router.get("/formula1/backdrop", async (req, res) => {
	res.sendFile(path.resolve("assets/formula1_backdrop.jpg"));
});

router.get("/dirty", async (req, res) => {
	res.sendFile(path.resolve("assets/dirty_trailer.mp4"));
});

router.get("/dirty/logo", async (req, res) => {
	res.sendFile(path.resolve("assets/dirty_logo.png"));
});

router.get("/dirty/backdrop", async (req, res) => {
	res.sendFile(path.resolve("assets/dirty_backdrop.jpg"));
});

router.get("/night", async (req, res) => {
	res.sendFile(path.resolve("assets/night_trailer.mp4"));
});

router.get("/night/logo", async (req, res) => {
	res.sendFile(path.resolve("assets/night_logo.png"));
});

router.get("/night/backdrop", async (req, res) => {
	res.sendFile(path.resolve("assets/night_backdrop.jpg"));
});

module.exports = router;
