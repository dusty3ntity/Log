import React from "react";
import { NavLink } from "react-router-dom";

import DictionarySelector from "./DictionarySelector";
import LearningIcon from "../icons/LearningIcon";
import PlusIcon from "../icons/PlusIcon";

const TopPanel = () => {
	return (
		<div id="top-panel">
			<div id="title-col">
				<h1 className="page-title">Dashboard</h1>
			</div>

			<div id="buttons-col">
				<div className="btn-space">
					<NavLink to="/learning" className="btn continue-learning top-panel-btn">
						<LearningIcon classNames="btn-icon" />
						<span className="lg-visible">Continue learning</span>
					</NavLink>

					<NavLink to="/new-item" className="btn new-item top-panel-btn">
						<PlusIcon classNames="btn-icon" />
						<span className="lg-visible">New item</span>
					</NavLink>
				</div>
			</div>

			<div id="dictionary-selector-col">
				<DictionarySelector />
			</div>
		</div>
	);
};

export default TopPanel;
