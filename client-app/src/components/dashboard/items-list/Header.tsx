import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Space, Button } from "antd";
import Search from "antd/lib/input/Search";

import { RootStoreContext } from "../../../app/stores/rootStore";

const Header = () => {
	const rootStore = useContext(RootStoreContext);
	const { showFiltersDrawer, filtersDrawerVisible } = rootStore.itemStore;

	return (
		<div id="header-container">
			<h2 id="items-list-title">Items</h2>

			<div id="buttons-container">
				<Space className="header-space" size="large">
					<Button id="filters-btn" className="header-btn mlg-hidden" onClick={showFiltersDrawer} disabled={filtersDrawerVisible}>
						<i id="filters-icon" className="material-icons header-icon">
							filter_list
						</i>
						<span>Filters</span>
					</Button>

					<Button id="group-by-date-btn" className="header-btn">
						<i id="group-by-date-icon" className="material-icons header-icon">
							insert_invitation
						</i>
					</Button>

					<Search id="item-search" placeholder="item..." />
				</Space>
			</div>
		</div>
	);
};

export default observer(Header);
