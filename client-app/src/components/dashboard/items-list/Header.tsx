import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import Search from "antd/lib/input/Search";

import { RootStoreContext } from "../../../app/stores/rootStore";
import FilterIcon from "../../icons/FilterIcon";
import CalendarIcon from "../../icons/CalendarIcon";

const Header = () => {
	const rootStore = useContext(RootStoreContext);
	const { showFiltersDrawer, filtersDrawerVisible } = rootStore.itemStore;
	const { activeDictionary } = rootStore.dictionariesStore;

	return (
		<div id="header-container">
			<div className="items-list-title">
				<span className="title">Items</span>
				<span className="items-counter">{activeDictionary!.wordsCount + activeDictionary!.phrasesCount}</span>
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

				<button className="btn header-btn round group-by-date-btn">
					<CalendarIcon />
				</button>

				<Search id="item-search" placeholder="item..." />
			</div>
		</div>
	);
};

export default observer(Header);
