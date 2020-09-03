import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";

import DictionarySelector from "./DictionarySelector";
import { RootStoreContext } from "../../app/stores/rootStore";
import LearningIcon from "../common/icons/LearningIcon";
import PlusIcon from "../common/icons/PlusIcon";

export interface ITopPanelProps {
	pageTitle: string;
}

const TopPanel: React.FC<ITopPanelProps> = ({ pageTitle, ...props }) => {
	const rootStore = useContext(RootStoreContext);
	const { finishItemsTourPart } = rootStore.tourStore;
	const { user } = rootStore.userStore;

	return (
		<div id="top-panel" {...props}>
			<div id="title-col">
				<h1 className="page-title">{pageTitle}</h1>
			</div>

			<div id="buttons-col">
				<div className="btn-space">
					<NavLink to="/learning" tour-step="1-10" className="btn continue-learning top-panel-btn">
						<LearningIcon className="btn-icon" />
						<span>Continue learning</span>
					</NavLink>

					<NavLink
						to="/new-item"
						tour-step="1-11"
						onClick={() => {
							if (!user!.tourCompleted && !user!.itemsTourCompleted) finishItemsTourPart();
						}}
						className="btn new-item top-panel-btn"
					>
						<PlusIcon className="btn-icon" />
						<span>New item</span>
					</NavLink>
				</div>
			</div>

			<div id="dictionary-selector-col">
				<DictionarySelector tour-step="1-9" />
			</div>
		</div>
	);
};

export default observer(TopPanel);
