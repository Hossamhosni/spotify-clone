import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import SpotifyItem from "./SpotifyItem";

export default function SpotifyItemList({ items, itemName }) {
	function chooseItem() {}
	return (
		<Container
			className="d-flex flex-column py-2"
			style={{ height: "100vh" }}
		>
			<Container
				className="flex-grow-1 my-2"
				style={{ overflowY: "auto" }}
			>
				<h2>{itemName}</h2>
				<Row>
					{items.map((item) => (
						<Col>
							<SpotifyItem
								item={item}
								key={item.uri}
								chooseItem={chooseItem}
							/>
						</Col>
					))}
				</Row>
			</Container>
		</Container>
	);
}
