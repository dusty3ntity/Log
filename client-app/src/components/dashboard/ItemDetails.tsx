import React from "react";
import { Layout, Row, Space, Divider } from "antd";

const { Sider } = Layout;

const ItemDetails = () => {
	return (
		<Sider
			id="item-details"
			className="dashboard-sider"
			width={328}
			trigger={null}
			collapsible
			breakpoint={"xl"}
			collapsedWidth={0}
		>
			<div id="details-container">
				<Row id="header-row" align="middle" justify="center">
					
				</Row>

				<Row id="item-row" align="middle" justify="center">
					<h2 id="original">Genuine</h2>
					<span id="type">Word</span>
					<Divider />
					<h3 id="translation">Оригинальный</h3>
					<p id="description">Being what something or someone appears or claims to be; real, not false.</p>
					<span id="description-origin">Cambridge Dictionary</span>
				</Row>

				<Row id="stats-row" align="middle" justify="center">
					
				</Row>

				<Row id="actions-row" align="middle" justify="center">
					<Space size="large">
						<button id="edit-btn" className="actions-btn">
							<i id="edit-icon" className="material-icons actions-icon">
								edit
							</i>
						</button>

						<button id="star-btn" className="actions-btn">
							<i id="star-icon" className="material-icons actions-icon">
								star
							</i>
						</button>

						<button id="delete-btn" className="actions-btn">
							<i id="delete-icon" className="material-icons actions-icon">
								delete
							</i>
						</button>
					</Space>
				</Row>
			</div>
		</Sider>
	);
};

export default ItemDetails;
