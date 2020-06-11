import React from "react";
import { Layout, Space } from "antd";
import { NavLink } from "react-router-dom";


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
					<NavLink to="/learning" exact className="btn continue-learning top-panel-btn">
						<LearningIcon classNames="btn-icon" />
						<span className="lg-visible">Continue learning</span>
					</NavLink>

					<NavLink to="/new-item" exact className="btn new-item top-panel-btn">
						<PlusIcon classNames="btn-icon" />
						<span className="lg-visible">New item</span>
					</NavLink>
				</Space>
			</div>

			<div id="dictionary-selector-col">
				<DictionarySelector />
			</div>
		</Header>
	);
};

export default TopPanel;
