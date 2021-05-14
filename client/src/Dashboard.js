import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import Player from "./Player";
import TrackSearchResult from "./TrackSearchResult";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
	clientId: "ccb8ead5296c45a980f01802be9fb2e5",
});

export default function Dashboard({ code }) {
	const accessToken = useAuth(code);
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [playingTrack, setPlayingTrack] = useState();
	const [lyrics, setLyrics] = useState("");

	function chooseTrack(track) {
		setPlayingTrack(track);
		setSearch("");
		setLyrics("");
	}

	useEffect(() => {
		if (!playingTrack) return;
		async function getLyrics() {
			try {
				const res = await axios.get("http://localhost:8000/lyrics", {
					params: {
						track: playingTrack.title,
						artist: playingTrack.artist,
					},
				});
				setLyrics(res.data.lyrics);
			} catch (e) {
				console.log(e);
				setLyrics("No Lyrics Found");
			}
		}
		getLyrics();
	}, [playingTrack]);

	useEffect(() => {
		if (!accessToken) return;
		spotifyApi.setAccessToken(accessToken);
	}, [accessToken]);

	useEffect(() => {
		if (!search) return setSearchResults([]);
		if (!accessToken) return;

		async function searchTracks(search) {
			const searchRes = await spotifyApi.searchTracks(search);
			// const searchSongs = await spotifyApi.searchTracks(search);
			console.log(searchRes);
			// console.log(searchSongs);
			setSearchResults(
				searchRes.body.tracks.items.map((track) => {
					const smallestAlbumImage = track.album.images.reduce(
						(smallest, image) => {
							if (image.height < smallest.height) return image;
							return smallest;
						},
						track.album.images[0]
					);
					return {
						artist: track.artists[0].name,
						title: track.name,
						uri: track.uri,
						albumUrl: smallestAlbumImage.url,
					};
				})
			);
		}
		searchTracks(search);
	}, [search, accessToken]);

	return (
		<Container
			className="d-flex flex-column py-2"
			style={{ height: "100vh" }}
		>
			<Form.Control
				type="search"
				placeholder="Search Songs/Artists"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
				{searchResults.map((track) => (
					<TrackSearchResult
						track={track}
						key={track.uri}
						chooseTrack={chooseTrack}
					/>
				))}
				{searchResults.length === 0 && (
					<div className="text-center" style={{ whiteSpace: "pre" }}>
						{lyrics}
					</div>
				)}
			</div>
			<div>
				<Player
					accessToken={accessToken}
					trackUri={playingTrack?.uri}
				/>
			</div>
		</Container>
	);
}
