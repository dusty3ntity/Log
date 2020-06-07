import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Drawer } from "antd";

import { RootStoreContext } from "../../../app/stores/rootStore";
import ItemFilters from "../ItemFilters";

const ItemFiltersDrawer = () => {
	const rootStore = useContext(RootStoreContext);
	const { filtersDrawerVisible, hideFiltersDrawer } = rootStore.itemStore;

	return (
		<Drawer
			className="dashboard-drawer item-filters-drawer mlg-hidden"
			placement="left"
			closable={false}
			onClose={hideFiltersDrawer}
			visible={filtersDrawerVisible}
			getContainer={false}
			style={{ position: "absolute" }}
		>
			<ItemFilters classNames="drawer-content" />
		</Drawer>
	);
};

export default observer(ItemFiltersDrawer);
