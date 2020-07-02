import React, { useContext } from "react";

import { RootStoreContext } from "../../app/stores/rootStore";
import { INewItem, IEditItem } from "../../app/models/item";
import ItemForm from "../common/forms/ItemForm";

const EditItem = () => {
	const rootStore = useContext(RootStoreContext);
	const { activeItem, editItem } = rootStore.itemStore;

	const onSubmit = (item: INewItem) => {
		console.log(item);

		const editedItem: IEditItem = {
			original: item.original,
			translation: item.translation,
			definition: item.definition,
			definitionOrigin: item.definitionOrigin,
		};

		editItem(activeItem!.id, editedItem);
	};

	return (
		<div id="edit-item-container" className="manage-item-container">
			<div id="edit-item" className="manage-item">
				<ItemForm id="edit-item-form" type={activeItem!.type} item={activeItem} onSubmit={onSubmit} />
			</div>
		</div>
	);
};

export default EditItem;
