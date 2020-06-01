import React from "react";
import { Layout, Button, Space } from "antd";

import DictionarySelector from "./DictionarySelector";

const { Header } = Layout;

const TopPanel = () => {
	return (
		<Header id="top-panel">
			<div id="page-title-container">
				<h1 className="page-title">Dashboard</h1>
			</div>

			<div id="buttons-container">
				<Space className="btn-space" size="large">
					<Button id="continue-learning-btn" className="top-panel-btn" type="link" block href="/">
						<i className="btn-icon material-icons">wb_incandescent</i>
						<span className="lg-hidden">Continue learning</span>
					</Button>

					<Button id="new-item-btn" className="top-panel-btn" type="link" href="/new-item">
						<i className="btn-icon material-icons">add</i>
						<span className="lg-hidden">New item</span>
					</Button>
				</Space>
			</div>

			<div id="dictionary-selector-container">
				<DictionarySelector />
			</div>
		</Header>
	);
};

export default TopPanel;
