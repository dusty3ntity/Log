import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import Search from "antd/lib/input/Search";

import { RootStoreContext } from "../../../app/stores/rootStore";
import FilterIcon from "../../icons/FilterIcon";
import LoadingIndicator from "../../common/loading/LoadingIndicator";

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
		<div id="header-container">
			<div className="items-list-title">
				<span className="title">Items</span>
				<span className="items-counter">
					{!loadingInitial && !loadingNext && <span className="text">{itemRegistry.size}</span>}
					{(loadingInitial || loadingNext) && <LoadingIndicator type="small" />}
				</span>
			</div>

			<div className="buttons-container">
				<button
					className="btn header-btn filters-btn xl-hidden"
					onClick={showFiltersDrawer}
					disabled={filtersDrawerVisible}
				>
					<FilterIcon />
					<span>Filters</span>
				</button>

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
