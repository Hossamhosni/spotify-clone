import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import Player from "./Player";
import Artists from "./artists/Artists";
import Songs from "./songs/Songs";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
	clientId: "ccb8ead5296c45a980f01802be9fb2e5",
});
export default function Dashboard({ code }) {
	const accessToken = useAuth(code);
	spotifyApi.setAccessToken(accessToken);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchTrackResults, setSearchTrackResults] = useState([]);
	const [searchArtistResults, setSearchArtistResults] = useState([]);
	const [searchAlbumResults, setSearchAlbumResults] = useState([]);
	const [searchPlaylistResults, setSearchPlaylistResults] = useState([]);
	const [playingTrack, setPlayingTrack] = useState();
	const [lyrics, setLyrics] = useState("");

	function chooseTrack(track) {
		setPlayingTrack(track);
		setSearchQuery("");
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
		if (!searchQuery) {
			setSearchTrackResults([]);
			setSearchArtistResults([]);
			setSearchAlbumResults([]);
			setSearchPlaylistResults([]);
			return;
		}
		if (!accessToken) return;

		async function search() {
			const searchTracksRes = await spotifyApi.searchTracks(searchQuery);
			const searchArtistsRes = await spotifyApi.searchArtists(
				searchQuery
			);
			setSearchTrackResults(
				searchTracksRes.body.tracks.items.slice(0, 3).map((track) => {
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

			setSearchArtistResults(
				searchArtistsRes.body.artists.items
					.slice(0, 3)
					.map((artist) => {
						return {
							name: artist.name,
							uri: artist.uri,
							image: artist.images[0]?.url,
						};
					})
			);
		}
		search();
	}, [searchQuery, accessToken]);

	return (
		<Container
			className="d-flex flex-column py-2"
			style={{ height: "100vh" }}
		>
			<Form.Control
				type="search"
				placeholder="Search Songs/Artists"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
			<Artists artists={searchArtistResults} />
			<Songs
				songs={searchTrackResults}
				chooseTrack={chooseTrack}
				lyrics={lyrics}
			/>
			<div>
				<Player
					accessToken={accessToken}
					trackUri={playingTrack?.uri}
				/>
			</div>
		</Container>
	);
}
