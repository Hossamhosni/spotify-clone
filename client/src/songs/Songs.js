import React from "react";
import Song from "./Song";
import { Container } from "react-bootstrap";

export default function Songs({ songs, chooseTrack, lyrics }) {
	return (
		<Container
			className="d-flex flex-column py-2"
			style={{ height: "100vh" }}
		>
			<h2>Songs</h2>
			<div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
				{songs.map((song) => (
					<Song song={song} key={song.uri} chooseSong={chooseTrack} />
				))}
				{songs.length === 0 && (
					<div className="text-center" style={{ whiteSpace: "pre" }}>
						{lyrics}
					</div>
				)}
			</div>
		</Container>
	);
}
