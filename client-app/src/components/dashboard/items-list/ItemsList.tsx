import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import SimpleBar from "simplebar-react";

import { RootStoreContext } from "../../../app/stores/rootStore";
import ItemFilters from "./ItemFilters";
import ListItem from "./ListItem";
import ItemFiltersDrawer from "../drawers/ItemFiltersDrawer";
import ItemDetailsDrawer from "../drawers/ItemDetailsDrawer";
import Header from "./Header";

const ItemsList = () => {
	const rootStore = useContext(RootStoreContext);
	const { itemsByDate } = rootStore.itemStore;

	return (
		<div id="items-list">
			<Header />

			<div id="content-container">
				<ItemFilters classNames="xl-visible" />

				<div id="list-container">
					<ItemFiltersDrawer />

					<SimpleBar style={{ height: "100%" }} autoHide={false} forceVisible="y" scrollbarMinSize={36}>
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
