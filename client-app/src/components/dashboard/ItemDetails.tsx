import React, { useContext } from "react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import ItemDetailsContent from "./ItemDetailsContent";
import ItemDetailsEditForm from "./ItemDetailsEditForm";

const ItemDetails = () => {
	const rootStore = useContext(RootStoreContext);
	const { activeItem, editing } = rootStore.itemStore;

	if (!activeItem) return <div></div>;

	if (editing) return <ItemDetailsEditForm item={activeItem} />

	return (
		<ItemDetailsContent item={activeItem} />
	);
};

export default observer(ItemDetails);
