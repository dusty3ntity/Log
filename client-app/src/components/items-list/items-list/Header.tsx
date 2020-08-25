import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../../app/stores/rootStore";
import FilterIcon from "../../icons/FilterIcon";
import LoadingIndicator from "../../common/loading/LoadingIndicator";
import { fireAnalyticsEvent } from "../../../app/common/analytics/analytics";
import Button from "../../common/inputs/Button";
import StarIcon from "../../icons/StarIcon";
import Tooltip from "../../common/tooltips/Tooltip";
import SearchInput from "../../common/inputs/SearchInput";

const Header = () => {
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
			fireAnalyticsEvent("Items", "Used the item search");
		} else {
			if (value.length === 0) {
				setPredicate("search", undefined);
				fireAnalyticsEvent("Items", "Reset the item search");
			}

			if (prevValue !== value) {
				setPredicate("search", value);
				fireAnalyticsEvent("Items", "Used the item search");
			}
		}
	};

	return (
		<div id="header-container">
			<div className="items-list-title">
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
					className="header-btn filters-btn xl-hidden"
					onClick={showFiltersDrawer}
					disabled={filtersDrawerVisible}
					icon={<FilterIcon />}
					text="Filters"
					analyticsEnabled
					analyticsCategory="Items"
					analyticsAction="Opened the item filters drawer"
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

export default observer(Header);
