import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";

import ItemDetails from "./item-details/ItemDetails";
import ItemsList from "./items-list/ItemsList";
import { RootStoreContext } from "../../app/stores/rootStore";
import { itemsTourSteps } from "../../app/models/tour";

const ItemsListPage = () => {
	const rootStore = useContext(RootStoreContext);
	const { startTour, finishItemsTourPart } = rootStore.tourStore;
	const { user } = rootStore.userStore;

	useEffect(() => {
		if (!user!.tourCompleted && !user!.itemsTourCompleted) {
			startTour(itemsTourSteps, finishItemsTourPart);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div id="items-list-page">
			<ItemsList />
			<ItemDetails classNames="xl-visible" tourStep="1-2" />
		</div>
	);
};

export default observer(ItemsListPage);
