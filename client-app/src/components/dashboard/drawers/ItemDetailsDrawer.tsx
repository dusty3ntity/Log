import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Drawer } from "antd";

import { RootStoreContext } from "../../../app/stores/rootStore";
import ItemDetails from "../item-details/ItemDetails";

const ItemDetailsDrawer = () => {
	const rootStore = useContext(RootStoreContext);
	const { detailsDrawerVisible, hideDetailsDrawer } = rootStore.itemStore;

	return (
		<Drawer
			className="dashboard-drawer item-details-drawer mlg-hidden"
			placement="right"
			closable={false}
			onClose={hideDetailsDrawer}
			visible={detailsDrawerVisible}
			getContainer={false}
			style={{ position: "absolute" }}
		>
			<ItemDetails classNames="drawer-content" />
		</Drawer>
	);
};

export default observer(ItemDetailsDrawer);
