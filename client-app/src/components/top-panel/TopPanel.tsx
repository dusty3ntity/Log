import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";

import DictionarySelector from "./DictionarySelector";
import LearningIcon from "../icons/LearningIcon";
import PlusIcon from "../icons/PlusIcon";
import { RootStoreContext } from "../../app/stores/rootStore";

interface IProps {
	title: string;
}

const TopPanel: React.FC<IProps> = ({ title }) => {
	const rootStore = useContext(RootStoreContext);
	const { finishItemsTourPart } = rootStore.tourStore;
	const { user } = rootStore.userStore;

	return (
		<div id="top-panel">
			<div id="title-col">
				<h1 className="page-title">{title}</h1>
			</div>

			<div id="buttons-col">
				<div className="btn-space">
					<NavLink to="/learning" tour-step="1-10" className="btn continue-learning top-panel-btn">
						<LearningIcon classNames="btn-icon" />
						<span className="mlg-visible">Continue learning</span>
					</NavLink>

					<NavLink
						to="/new-item"
						tour-step="1-11"
						onClick={() => {
							if (!user!.tourCompleted && !user!.itemsTourCompleted) finishItemsTourPart();
						}}
						className="btn new-item top-panel-btn"
					>
						<PlusIcon classNames="btn-icon" />
						<span className="mlg-visible">New item</span>
					</NavLink>
				</div>
			</div>

			<div id="dictionary-selector-col">
				<DictionarySelector />
			</div>
		</div>
	);
};

export default observer(TopPanel);
