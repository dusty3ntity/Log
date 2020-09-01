import React, { useState, useContext } from "react";

import LanguagesList from "./LanguagesList";
import { RootStoreContext } from "../../app/stores/rootStore";
import DictionaryForm from "./DictionaryForm";
import { IDictionary } from "../../app/models/dictionary";
import { ILanguage } from "../../app/models/languages";
import { languagesList } from "../../app/models/languages";
import Drawer from "../common/other/Drawer";

const NewDictionary = () => {
	const rootStore = useContext(RootStoreContext);
	const { dictionariesRegistry, createDictionary } = rootStore.dictionaryStore;

	const [isLeftDrawerVisible, setLeftDrawerVisible] = useState(false);
	const [isRightDrawerVisible, setRightDrawerVisible] = useState(false);

	const onLeftDrawerClick = () => {
		setRightDrawerVisible(false);
		setLeftDrawerVisible(!isLeftDrawerVisible);
	};

	const onRightDrawerClick = () => {
		setLeftDrawerVisible(false);
		setRightDrawerVisible(!isRightDrawerVisible);
	};

	const [selectedKnownLanguage, selectKnownLanguage] = useState<ILanguage | undefined>(undefined);
	const [selectedLanguageToLearn, selectLanguageToLearn] = useState<ILanguage | undefined>(undefined);

	const [disabledKnownLanguagesList, setDisabledKnownLanguagesList] = useState<ILanguage[]>([]);
	const [disabledLanguagesToLearnList, setDisabledLanguagesToLearnList] = useState<ILanguage[]>([]);

	const handleKnownLanguageSelection = (language: ILanguage) => {
		const disabledLanguagesCodes = [language.isoCode];

		dictionariesRegistry.forEach((dictionary: IDictionary) => {
			if (dictionary.knownLanguage.isoCode === language.isoCode) {
				disabledLanguagesCodes.push(dictionary.languageToLearn.isoCode);
			}
		});

		setDisabledLanguagesToLearnList(
			languagesList.filter((language) => {
				return disabledLanguagesCodes.includes(language.isoCode);
			})
		);

		selectKnownLanguage(language);
	};

	const handleLanguageToLearnSelection = (language: ILanguage) => {
		const disabledLanguagesCodes = [language.isoCode];

		dictionariesRegistry.forEach((dictionary: IDictionary) => {
			if (dictionary.languageToLearn.isoCode === language.isoCode) {
				disabledLanguagesCodes.push(dictionary.knownLanguage.isoCode);
			}
		});

		setDisabledKnownLanguagesList(
			languagesList.filter((language) => {
				return disabledLanguagesCodes.includes(language.isoCode);
			})
		);

		selectLanguageToLearn(language);
	};

	const resetKnownLanguage = () => {
		setDisabledLanguagesToLearnList([]);
		selectKnownLanguage(undefined);
	};

	const resetLanguageToLearn = () => {
		setDisabledKnownLanguagesList([]);
		selectLanguageToLearn(undefined);
	};

	return (
		<div id="new-dictionary-container" className="manage-dictionary-container">
			<LanguagesList
				id="language-list-from"
				title="I know:"
				disabledItems={disabledKnownLanguagesList}
				selectedItem={selectedKnownLanguage}
				onItemSelect={handleKnownLanguageSelection}
				reset={resetKnownLanguage}
			/>

			<div id="new-dictionary">
				<Drawer
					classNames={["languages-list-drawer"]}
					placement="left"
					visible={isLeftDrawerVisible}
					onClose={() => setLeftDrawerVisible(false)}
				>
					<LanguagesList
						className="in-drawer"
						title="I know:"
						disabledItems={disabledKnownLanguagesList}
						selectedItem={selectedKnownLanguage}
						onItemSelect={handleKnownLanguageSelection}
						reset={resetKnownLanguage}
					/>
				</Drawer>

				<DictionaryForm
					id="new-dictionary-form"
					knownLanguage={selectedKnownLanguage}
					languageToLearn={selectedLanguageToLearn}
					onKnownLanguageButtonClick={onLeftDrawerClick}
					onLanguageToLearnButtonClick={onRightDrawerClick}
					onSubmit={createDictionary}
				/>

				<Drawer
					classNames={["languages-list-drawer"]}
					visible={isRightDrawerVisible}
					onClose={() => setRightDrawerVisible(false)}
				>
					<LanguagesList
						className="in-drawer"
						title="I learn:"
						disabledItems={disabledLanguagesToLearnList}
						selectedItem={selectedLanguageToLearn}
						onItemSelect={handleLanguageToLearnSelection}
						reset={resetLanguageToLearn}
					/>
				</Drawer>
			</div>

			<LanguagesList
				id="language-list-to"
				title="I learn:"
				disabledItems={disabledLanguagesToLearnList}
				selectedItem={selectedLanguageToLearn}
				onItemSelect={handleLanguageToLearnSelection}
				reset={resetLanguageToLearn}
			/>
		</div>
	);
};

export default NewDictionary;
