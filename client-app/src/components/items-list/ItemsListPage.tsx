import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";

import Page from "../../app/layout/Page";
import ItemDetails from "./item-details/ItemDetails";
import ItemsList from "./items-list/ItemsList";
import { RootStoreContext } from "../../app/stores/rootStore";
import { itemsTourSteps } from "../../app/models/tour";

const ItemsListPage: React.FC = ({ ...props }) => {
	const rootStore = useContext(RootStoreContext);
	const { startTour, finishItemsTourPart } = rootStore.tourStore;
	const { user } = rootStore.userStore;

	useEffect(() => {
		if (!user!.tourCompleted && !user!.itemsTourCompleted) {
			startTour(itemsTourSteps, finishItemsTourPart);
		}
	}, [user, startTour, finishItemsTourPart]);

	return (
		<Page pageTitle="Items list" id="items-list-page" {...props}>
			<ItemsList />
			<ItemDetails tour-step="1-2" />
		</Page>
	);
};

export default observer(ItemsListPage);
