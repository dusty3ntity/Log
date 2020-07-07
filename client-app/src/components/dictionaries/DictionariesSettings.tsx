import React, { useContext, useState } from "react";
import SimpleBar from "simplebar-react";

import { RootStoreContext } from "../../app/stores/rootStore";
import DictionaryForm from "./DictionaryForm";
import DictionariesListItem from "./DictionariesListItem";
import { IDictionary } from "../../app/models/dictionary";

const DictionariesSettings = () => {
	const rootStore = useContext(RootStoreContext);
	const { dictionariesRegistry, activeDictionary, deleteDictionary } = rootStore.dictionaryStore;

	const [selectedDictionary, selectDictionary] = useState<IDictionary | undefined>(undefined);

	const onFormSubmit = (formData: any) => {};

	return (
		<div id="dictionaries-settings-container" className="manage-dictionary-container">
			<div id="dictionaries-list">
				<div className="list-title">Dictionaries</div>

				<div className="list-container">
					<SimpleBar style={{ height: "100%" }} autoHide={false} forceVisible="y" scrollbarMinSize={36}>
						<div className="list">
							{Array.from(dictionariesRegistry.values()).map((dictionary) => (
								<DictionariesListItem
									key={dictionary.id}
									dictionary={dictionary}
									isActive={selectedDictionary?.id === dictionary.id}
									onClick={(dictionary: IDictionary) => selectDictionary(dictionary)}
									onDelete={(dictionary: IDictionary) => deleteDictionary(dictionary.id)}
								/>
							))}
						</div>
					</SimpleBar>
				</div>
			</div>

			<div id="edit-dictionary">
				<DictionaryForm id="edit-dictionary-form" dictionary={activeDictionary!} onSubmit={onFormSubmit} />
			</div>
		</div>
	);
};

export default DictionariesSettings;
