import React from "react";

export default function SpotifyItem({ item }) {
	return (
		<div
			className="d-flex m-2 align-items-center"
			style={{ cursor: "pointer" }}
		>
			<img
				alt={item.name}
				src={item.image}
				style={{ height: "64px", width: "64px" }}
			/>
			<div className="ml-3">
				<div>{item.name}</div>
			</div>
		</div>
	);
}
