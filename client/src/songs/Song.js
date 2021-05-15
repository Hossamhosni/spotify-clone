import React from "react";

export default function Song({ song, chooseSong }) {
	function handlePlay() {
		chooseSong(song);
	}

	return (
		<div
			className="d-flex m-2 align-items-center"
			style={{ cursor: "pointer" }}
			onClick={handlePlay}
		>
			<img
				src={song.albumUrl}
				style={{ height: "64px", width: "64px" }}
			/>
			<div className="ml-3">
				<div>{song.title}</div>
				<div className="text-muted">{song.artist}</div>
			</div>
		</div>
	);
}
