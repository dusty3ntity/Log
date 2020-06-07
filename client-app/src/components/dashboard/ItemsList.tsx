import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Space, Button } from "antd";
import Search from "antd/lib/input/Search";
import SimpleBar from "simplebar-react";

import { RootStoreContext } from "../../app/stores/rootStore";
import ItemFilters from "./ItemFilters";
import ListItem from "./ListItem";
import ItemFiltersDrawer from "./drawers/ItemFiltersDrawer";
import ItemDetailsDrawer from "./drawers/ItemDetailsDrawer";

const ItemsList = () => {
	const rootStore = useContext(RootStoreContext);
	const { itemsByDate, showFiltersDrawer } = rootStore.itemStore;

	return (
		<div id="items-list">
			<div id="header-container">
				<h2 id="items-list-title">Items</h2>

				<Space className="space" size="large">
					<Button id="filters-btn" className="mlg-hidden" type="primary" onClick={showFiltersDrawer}>
						Filters
					</Button>

					<button id="group-by-date-btn">
						<i id="group-by-date-icon" className="material-icons items-list-header-icon">
							insert_invitation
						</i>
					</button>

					<Search id="item-search" placeholder="item..." />
				</Space>
			</div>

			<div id="content-container">
				<ItemFilters classNames="mlg-visible" />

				<div id="list-container">
					<ItemFiltersDrawer />

					<SimpleBar style={{ height: "100%" }} autoHide={false}>
						<div id="list">
							{itemsByDate.map((item) => (
								<ListItem key={item.id} item={item} />
							))}
						</div>
					</SimpleBar>

					<ItemDetailsDrawer />
				</div>
			</div>
		</div>
	);
};

export default observer(ItemsList);
