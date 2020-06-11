import React from "react";
import { Layout, Button, Space } from "antd";

import DictionarySelector from "./DictionarySelector";
import LearningIcon from "../icons/LearningIcon";
import PlusIcon from "../icons/PlusIcon";

const { Header } = Layout;

const TopPanel = () => {
	return (
		<Header id="top-panel">
			<div id="title-col">
				<h1 className="page-title">Dashboard</h1>
			</div>

			<div id="buttons-col">
				<Space className="btn-space" size="large">
					<Button id="continue-learning-btn" className="top-panel-btn" type="link" block href="/">
						<LearningIcon classNames="btn-icon" />
						<span className="lg-visible">Continue learning</span>
					</Button>

					<Button id="new-item-btn" className="top-panel-btn" type="link" href="/new-item">
						<PlusIcon classNames="btn-icon" />
						<span className="lg-visible">New item</span>
					</Button>
				</Space>
			</div>

			<div id="dictionary-selector-col">
				<DictionarySelector />
			</div>
		</Header>
	);
};

export default TopPanel;
