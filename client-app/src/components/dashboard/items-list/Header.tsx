import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Space } from "antd";
import Search from "antd/lib/input/Search";

import { RootStoreContext } from "../../../app/stores/rootStore";
import FilterIcon from "../../icons/FilterIcon";
import CalendarIcon from "../../icons/CalendarIcon";

const Header = () => {
	const rootStore = useContext(RootStoreContext);
	const { showFiltersDrawer, filtersDrawerVisible } = rootStore.itemStore;

	return (
		<div id="header-container">
			<h2 id="items-list-title">Items</h2>

			<div id="buttons-container">
				<Space className="header-space" size="large">
					<button
						className="btn header-btn filters-btn mlg-hidden"
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
				</Space>
			</div>
		</div>
	);
};

export default observer(Header);
