import React from "react";
import { Container } from "react-bootstrap";
import SpotifyItem from "./SpotifyItem";

export default function Albums({ albums }) {
	function chooseAlbum() {}
	return (
		<Container
			className="d-flex flex-column py-2"
			style={{ height: "100vh" }}
		>
			<h2>Albums</h2>
			<div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
				{albums.map((album) => (
					<SpotifyItem
						item={album}
						key={album.uri}
						chooseAlbum={chooseAlbum}
					/>
				))}
			</div>
		</Container>
	);
}
