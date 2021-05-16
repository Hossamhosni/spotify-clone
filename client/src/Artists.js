import React from "react";
import { Container } from "react-bootstrap";

import SpotifyItem from "./SpotifyItem";

export default function Artists({ artists }) {
	function chooseArtist() {}
	return (
		<Container
			className="d-flex flex-column py-2"
			style={{ height: "100vh" }}
		>
			<h2>Artists</h2>
			<div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
				{artists.map((artist) => (
					<SpotifyItem
						item={artist}
						key={artist.uri}
						chooseArtist={chooseArtist}
					/>
				))}
			</div>
		</Container>
	);
}
