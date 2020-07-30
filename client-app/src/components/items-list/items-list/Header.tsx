import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import Search from "antd/lib/input/Search";

import { RootStoreContext } from "../../../app/stores/rootStore";
import FilterIcon from "../../icons/FilterIcon";
import LoadingIndicator from "../../common/loading/LoadingIndicator";
import { fireAnalyticsEvent } from "../../../app/common/analytics/analytics";
import Button from "../../common/inputs/Button";

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

				<Search
					key={rootStore.dictionaryStore.activeDictionaryId}
					id="item-search"
					placeholder="item..."
					loading={loadingInitial || loadingNext}
					defaultValue={predicate.get("search") ?? ""}
					onSearch={handleSearch}
				/>
			</div>
		</div>
	);
};

export default observer(Header);
