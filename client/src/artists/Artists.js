import React from "react";
import { Container } from "react-bootstrap";

import Artist from "./Artist";

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
					<Artist
						artist={artist}
						key={artist.uri}
						chooseArtist={chooseArtist}
					/>
				))}
			</div>
		</Container>
	);
}
