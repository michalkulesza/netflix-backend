const admin = require("firebase-admin");

const keysEnvVar = process.env["CREDS"];
if (!keysEnvVar) {
	throw new Error("The CREDS environment variable was not found!");
}
const keys = JSON.parse(keysEnvVar);

admin.initializeApp({
	credential: admin.credential.cert(keys),
	databaseURL: "https://netflix-d2613.firebaseio.com",
});

module.exports = admin;
