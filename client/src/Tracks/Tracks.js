import React from "react";
import Track from "./Track";
import { Container } from "react-bootstrap";

export default function Tracks({ tracks, chooseTrack, lyrics }) {
	return (
		<Container
			className="d-flex flex-column py-2"
			style={{ height: "100vh" }}
		>
			<h2>Songs</h2>
			<div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
				{tracks.map((track) => (
					<Track
						track={track}
						key={track.uri}
						chooseTrack={chooseTrack}
					/>
				))}
				{tracks.length === 0 && (
					<div className="text-center" style={{ whiteSpace: "pre" }}>
						{lyrics}
					</div>
				)}
			</div>
		</Container>
	);
}
