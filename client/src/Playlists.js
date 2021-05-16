import React from "react";
import { Container } from "react-bootstrap";
import SpotifyItem from "./SpotifyItem";

export default function Playlists({ playlists }) {
	function choosePlaylist() {}
	return (
		<Container
			className="d-flex flex-column py-2"
			style={{ height: "100vh" }}
		>
			<h2>Playlists</h2>
			<div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
				{playlists.map((playlist) => (
					<SpotifyItem
						item={playlist}
						key={playlist.uri}
						choosePlaylist={choosePlaylist}
					/>
				))}
			</div>
		</Container>
	);
}
