import React from "react";
import Track from "./Track";
import { Container, Col, Row } from "react-bootstrap";

export default function Tracks({ tracks, chooseTrack, lyrics }) {
	return (
		<Container
			className="d-flex flex-column py-2"
			style={{ height: "100vh" }}
		>
			<Container
				className="flex-grow-1 my-2"
				style={{ overflowY: "auto" }}
			>
				<h2>Songs</h2>
				<Row>
					{tracks.map((track) => (
						<Col>
							<Track
								track={track}
								key={track.uri}
								chooseTrack={chooseTrack}
							/>
						</Col>
					))}
					{tracks.length === 0 && (
						<div
							className="text-center"
							style={{ whiteSpace: "pre" }}
						>
							{lyrics}
						</div>
					)}
				</Row>
			</Container>
		</Container>
	);
}
