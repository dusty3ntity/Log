import React, { useContext } from "react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import ItemDetailsContent from "./ItemDetailsContent";

const ItemDetails = () => {
	const rootStore = useContext(RootStoreContext);
	const { activeItem } = rootStore.itemStore;

	if (!activeItem) return <div></div>;

	return (
		<ItemDetailsContent />
	);
};

export default observer(ItemDetails);
