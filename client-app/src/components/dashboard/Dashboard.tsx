import React from "react";

import ItemDetails from "./item-details/ItemDetails";
import ItemsList from "./items-list/ItemsList";

const Dashboard = () => {
	return (
		<div id="dashboard">
			<ItemsList />
			<ItemDetails classNames="xl-visible" />
		</div>
	);
};

export default Dashboard;
