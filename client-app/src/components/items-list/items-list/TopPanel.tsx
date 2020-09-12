import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../../app/stores/rootStore";
import LoadingIndicator from "../../common/loading/LoadingIndicator";
import Button from "../../common/inputs/Button";
import Tooltip from "../../common/tooltips/Tooltip";
import SearchInput from "../../common/inputs/SearchInput";
import StarIcon from "../../common/icons/StarIcon";
import FilterIcon from "../../common/icons/FilterIcon";

const TopPanel: React.FC = ({ ...props }) => {
	const rootStore = useContext(RootStoreContext);
	const {
		showFiltersDrawer,
		filtersDrawerVisible,
		itemRegistry,
		loadingInitial,
		loadingNext,
		predicate,
		setPredicate,
	} = rootStore.itemStore;
	const { activeDictionary } = rootStore.dictionaryStore;

	const handleSearch = (value: string) => {
		const prevValue = predicate.get("search");

		if (!prevValue && value.length === 0) {
			return;
		}

		if (!prevValue) {
			setPredicate("search", value);
		} else {
			if (value.length === 0) {
				setPredicate("search", undefined);
			}

			if (prevValue !== value) {
				setPredicate("search", value);
			}
		}
	};

	return (
		<div id="items-list-top-panel" {...props}>
			<div className="title-container">
				<span className="title">Items</span>

				<span className="items-counter">
					{!loadingInitial && !loadingNext && <span className="text">{itemRegistry.size}</span>}
					{(loadingInitial || loadingNext) && <LoadingIndicator type="small" />}
				</span>
			</div>

			<div className="buttons-container">
				{activeDictionary.starredItemsCount > activeDictionary.preferredLearningListSize && (
					<Tooltip
						text="There is no space for all of the starred items to be in a training. Some starred items will not be present in some trainings."
						position="bottom"
						className="starred-items-overload-warning"
					>
						<span className="starred-count">{activeDictionary.starredItemsCount}</span>
						<span className="slash">/</span>
						<span>{activeDictionary.preferredLearningListSize}</span>
						<StarIcon active />
					</Tooltip>
				)}

				<Button
					className="header-btn filters-btn"
					onClick={showFiltersDrawer}
					disabled={filtersDrawerVisible}
					icon={<FilterIcon />}
					text="Filters"
				/>

				<SearchInput
					key={rootStore.dictionaryStore.activeDictionaryId}
					onSearch={handleSearch}
					loading={loadingInitial || loadingNext}
					defaultValue={predicate.get("search")}
					placeholder="item..."
				/>
			</div>
		</div>
	);
};

export default observer(TopPanel);
