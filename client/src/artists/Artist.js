import React from "react";

export default function Artist({ artist }) {
	return (
		<div
			className="d-flex m-2 align-items-center"
			style={{ cursor: "pointer" }}
		>
			<img src={artist.image} style={{ height: "64px", width: "64px" }} />
			<div className="ml-3">
				<div>{artist.name}</div>
				{/* <div className="text-muted">{artist.artist}</div> */}
			</div>
		</div>
	);
}
