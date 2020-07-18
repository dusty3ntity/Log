import React from "react";

import ItemDetails from "./item-details/ItemDetails";
import ItemsList from "./items-list/ItemsList";

const ItemsListPage = () => {
	return (
		<div id="items-list-page">
			<ItemsList />
			<ItemDetails classNames="xl-visible" />
		</div>
	);
};

export default ItemsListPage;
