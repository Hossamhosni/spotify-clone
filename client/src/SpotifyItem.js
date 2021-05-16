import React from "react";
import { Card } from "react-bootstrap";

export default function SpotifyItem({ item }) {
	return (
		<Card style={{ backgroundColor: "#282828", color: "white" }}>
			<Card.Img
				variant="top"
				style={{
					width: "100%",
					height: "10vw",
					justifyContent: "center",
					alignItems: "center",
				}}
				src={item.image}
			/>
			<Card.Header>{item.name}</Card.Header>
		</Card>
	);
}
