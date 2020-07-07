import React, { useContext, useState } from "react";
import SimpleBar from "simplebar-react";
import { observer } from "mobx-react-lite";
import { Drawer } from "antd";

import { RootStoreContext } from "../../app/stores/rootStore";
import DictionaryForm from "./DictionaryForm";
import DictionariesListItem from "./DictionariesListItem";
import { IDictionary } from "../../app/models/dictionary";

const DictionariesSettings = () => {
	const rootStore = useContext(RootStoreContext);
	const { dictionariesRegistry, activeDictionary, deleteDictionary } = rootStore.dictionaryStore;

	const [selectedDictionary, selectDictionary] = useState<IDictionary | undefined>(undefined);

	const [isDrawerVisible, setDrawerVisible] = useState(false);

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
									onClick={(dictionary: IDictionary) => {
										selectDictionary(dictionary);
										setDrawerVisible(true);
									}}
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

			<Drawer
				className={`drawer dictionaries-settings-drawer ${!isDrawerVisible ? " no-shadow" : ""}`}
				placement="right"
				closable={false}
				visible={isDrawerVisible}
				onClose={() => setDrawerVisible(false)}
				getContainer={false}
				style={{ position: "absolute" }}
			>
				<DictionaryForm
					id="edit-dictionary-form"
					className="drawer-content"
					dictionary={activeDictionary!}
					onSubmit={onFormSubmit}
				/>
			</Drawer>
		</div>
	);
};

export default observer(DictionariesSettings);
