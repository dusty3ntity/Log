import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../app/stores/rootStore";
import ItemDetails from "./item-details/ItemDetails";
import ItemsList from "./items-list/ItemsList";

const Dashboard = () => {
	const rootStore = useContext(RootStoreContext);
	const { loadItems, loadingInitial } = rootStore.itemStore;

	useEffect(() => {
		loadItems();
	}, [loadItems]);

	if (loadingInitial) return <div></div>;

	return (
		<div id="dashboard">
			<ItemsList />
			<ItemDetails classNames="xl-visible" />
		</div>
	);
};

export default observer(Dashboard);
