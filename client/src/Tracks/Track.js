import React from "react";
import { Card } from "react-bootstrap";

export default function Track({ track, chooseTrack }) {
	function handlePlay() {
		chooseTrack(track);
	}

	return (
		<Card
			style={{
				backgroundColor: "#282828",
				color: "white",
				cursor: "pointer",
			}}
			onClick={handlePlay}
		>
			<Card.Img
				variant="top"
				style={{
					width: "100%",
					height: "10vw",
					justifyContent: "center",
					alignItems: "center",
				}}
				src={track.albumUrl}
			/>
			<Card.Header>{track.title}</Card.Header>
			<Card.Body className="text-muted">{track.artist}</Card.Body>
		</Card>
	);
}
