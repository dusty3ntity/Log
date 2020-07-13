import React, { useContext, useState } from "react";
import SimpleBar from "simplebar-react";
import { observer } from "mobx-react-lite";
import { Drawer } from "antd";

import { RootStoreContext } from "../../app/stores/rootStore";
import DictionaryForm from "./DictionaryForm";
import DictionariesListItem from "./DictionariesListItem";
import { IDictionary } from "../../app/models/dictionary";
import Empty from "../common/other/Empty";

const DictionariesSettings = () => {
	const rootStore = useContext(RootStoreContext);
	const {
		dictionariesRegistry,
		editDictionary,
		deleteDictionary,
		setMainDictionary,
		settingMain,
	} = rootStore.dictionaryStore;

	const [selectedDictionary, selectDictionary] = useState<IDictionary | undefined>(undefined);

	const [isDrawerVisible, setDrawerVisible] = useState(false);

	const onDelete = async () => {
		const success = await deleteDictionary(selectedDictionary!.id);

		if (success) {
			selectDictionary(undefined);
		}
	};

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
									onSetMain={(dictionary: IDictionary) => setMainDictionary(dictionary.id)}
									settingMain={settingMain}
								/>
							))}
						</div>
					</SimpleBar>
				</div>
			</div>

			<div id="edit-dictionary">
				{selectedDictionary && (
					<DictionaryForm
						key={selectedDictionary.id}
						id="edit-dictionary-form"
						dictionary={selectedDictionary}
						onSubmit={editDictionary}
						onDelete={onDelete}
					/>
				)}

				{!selectedDictionary && <Empty text="Select a dictionary" size={9} />}
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
					dictionary={selectedDictionary}
					onSubmit={editDictionary}
					onDelete={onDelete}
				/>
			</Drawer>
		</div>
	);
};

export default observer(DictionariesSettings);
