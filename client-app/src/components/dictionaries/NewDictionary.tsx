import React, { useState, useContext } from "react";

import LanguagesList from "./LanguagesList";
import LanguagesListDrawer from "./drawers/LanguagesListDrawer";
import { RootStoreContext } from "../../app/stores/rootStore";
import DictionaryForm from "./DictionaryForm";
import { ILanguage, IDictionary } from "../../app/models/dictionary";
import { languagesList } from "../../app/models/languages";

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
			<LanguagesListDrawer
				listId="language-list-from"
				listType="known-language"
				selectedItem={selectedKnownLanguage}
				disabledItems={disabledKnownLanguagesList}
				className="lang-from"
				position="left"
				isVisible={isLeftDrawerVisible}
				onClose={() => setLeftDrawerVisible(false)}
				onItemSelect={handleKnownLanguageSelection}
				reset={resetKnownLanguage}
			/>

			<LanguagesList
				id="language-list-from"
				type="known-language"
				disabledItems={disabledKnownLanguagesList}
				selectedItem={selectedKnownLanguage}
				onItemSelect={handleKnownLanguageSelection}
				reset={resetKnownLanguage}
			/>

			<div id="new-dictionary">
				<DictionaryForm
					id="new-dictionary-form"
					knownLanguage={selectedKnownLanguage}
					languageToLearn={selectedLanguageToLearn}
					onKnownLanguageButtonClick={onLeftDrawerClick}
					onLanguageToLearnButtonClick={onRightDrawerClick}
					onSubmit={createDictionary}
				/>
			</div>

			<LanguagesList
				id="language-list-to"
				type="language-to-learn"
				disabledItems={disabledLanguagesToLearnList}
				selectedItem={selectedLanguageToLearn}
				onItemSelect={handleLanguageToLearnSelection}
				reset={resetLanguageToLearn}
			/>

			<LanguagesListDrawer
				listId="language-list-to"
				listType="language-to-learn"
				disabledItems={disabledLanguagesToLearnList}
				selectedItem={selectedLanguageToLearn}
				className="lang-to"
				position="right"
				isVisible={isRightDrawerVisible}
				onClose={() => setRightDrawerVisible(false)}
				onItemSelect={handleLanguageToLearnSelection}
				reset={resetLanguageToLearn}
			/>
		</div>
	);
};

export default NewDictionary;
