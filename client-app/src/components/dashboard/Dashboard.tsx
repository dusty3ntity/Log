import React, { useContext, useEffect } from "react";

import { RootStoreContext } from "../../app/stores/rootStore";
import ItemDetails from "./ItemDetails";
import ItemsList from "./ItemsList";

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
			<ItemDetails classNames="mlg-hidden" />
		</div>
	);
};

export default Dashboard;
