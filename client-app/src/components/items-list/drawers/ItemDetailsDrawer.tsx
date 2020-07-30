import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Drawer } from "antd";

import { RootStoreContext } from "../../../app/stores/rootStore";
import ItemDetails from "../item-details/ItemDetails";

const ItemDetailsDrawer = () => {
	const rootStore = useContext(RootStoreContext);
	const { detailsDrawerVisible, hideDetailsDrawer } = rootStore.itemStore;

	const noShadowClass = !detailsDrawerVisible ? " no-shadow" : "";

	return (
		<Drawer
			className={"drawer items-list-drawer item-details-drawer xl-hidden" + noShadowClass}
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
