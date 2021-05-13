require("dotenv").config();
const express = require("express");
const SpotifyApi = require("spotify-web-api-node");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/login", async (req, res) => {
	const code = req.body.code;
	const spotifyApi = new SpotifyApi({
		redirectUri: process.env.REDIRECT_URI,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
	});

	try {
		const response = await spotifyApi.authorizationCodeGrant(code);
		res.json({
			accessToken: response.body.access_token,
			refreshToken: response.body.refresh_token,
			expiresIn: response.body.expires_in,
		});
	} catch (e) {
		res.sendStatus(400);
	}
});

app.get("/refreshToken", (req, res) => {});

app.get("/lyrics", (req, res) => {});

app.listen(port, () => console.log(`Listening on port ${port}`));
