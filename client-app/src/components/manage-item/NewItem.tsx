import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../app/stores/rootStore";
import { ItemType, INewItem } from "../../app/models/item";
import ItemForm from "../common/forms/ItemForm";
import { fireAnalyticsEvent } from "../../app/common/analytics/analytics";
import { newItemTourSteps } from "../../app/models/tour";
import { Tabs, Tab } from "../common/other/Tabs";

const NewItem = () => {
	const rootStore = useContext(RootStoreContext);
	const { createItem, submitting } = rootStore.itemStore;
	const { activeDictionary } = rootStore.dictionaryStore;
	const { startTour, finishNewItemTourPart } = rootStore.tourStore;
	const { user } = rootStore.userStore;

	const onSubmit = async (item: INewItem, resetForm: () => void) => {
		const success = await createItem(item);

		if (success) {
			resetForm();
			fireAnalyticsEvent("Items", "Created an item");
		}
	};

	useEffect(() => {
		if (!user!.tourCompleted && !user!.newItemTourCompleted) {
			startTour(newItemTourSteps, finishNewItemTourPart);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div id="new-item-container" className="manage-item-container">
			<div id="new-item" tour-step="2-1" className="manage-item">
				<Tabs defaultActiveKey={ItemType.Word + ""}>
					<Tab name="Word" tabKey={ItemType.Word + ""}>
						<ItemForm
							id="new-word-form"
							type={ItemType.Word}
							onSubmit={onSubmit}
							submitting={submitting}
							knownLanguageCode={activeDictionary.knownLanguage.isoCode}
							languageToLearnCode={activeDictionary.languageToLearn.isoCode}
						/>
					</Tab>

					<Tab name="Phrase" tabKey={ItemType.Phrase + ""}>
						<ItemForm
							id="new-phrase-form"
							type={ItemType.Phrase}
							onSubmit={onSubmit}
							submitting={submitting}
							knownLanguageCode={activeDictionary.knownLanguage.isoCode}
							languageToLearnCode={activeDictionary.languageToLearn.isoCode}
						/>
					</Tab>
				</Tabs>
			</div>
		</div>
	);
};

export default observer(NewItem);
