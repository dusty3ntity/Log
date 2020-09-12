import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import Page from "../../app/layout/Page";
import { RootStoreContext } from "../../app/stores/rootStore";
import { INewItem, IEditItem } from "../../app/models/item";
import ItemForm from "./ItemForm";

const EditItemPage: React.FC = ({ ...props }) => {
	const rootStore = useContext(RootStoreContext);
	const { activeItem, editItem, submitting } = rootStore.itemStore;
	const { activeDictionary } = rootStore.dictionaryStore;

	const onSubmit = (item: INewItem) => {
		const editedItem: IEditItem = {
			original: item.original,
			translation: item.translation,
			definition: item.definition,
			definitionOrigin: item.definitionOrigin,
		};

		editItem(activeItem!.id, editedItem);
	};

	return (
		<Page pageTitle="Edit item" id="edit-item-page" className="manage-item-page" {...props}>
			<div id="edit-item" className="manage-item">
				<ItemForm
					id="edit-item-form"
					type={activeItem!.type}
					item={activeItem}
					onSubmit={onSubmit}
					submitting={submitting}
					knownLanguageCode={activeDictionary.knownLanguage.isoCode}
					languageToLearnCode={activeDictionary.languageToLearn.isoCode}
				/>
			</div>
		</Page>
	);
};

export default observer(EditItemPage);
