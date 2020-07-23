import React, { useState, useContext } from "react";

import LanguagesList from "./LanguagesList";
import LanguagesListDrawer from "./drawers/LanguagesListDrawer";
import { RootStoreContext } from "../../app/stores/rootStore";
import DictionaryForm from "./DictionaryForm";
import { IDictionary } from "../../app/models/dictionary";
import { ILanguage } from "../../app/models/languages";
import { languagesList } from "../../app/models/languages";
import { fireAnalyticsEvent } from "../../app/common/analytics/analytics";

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
		fireAnalyticsEvent("Dictionary creation", "Reset the known language");
	};

	const resetLanguageToLearn = () => {
		setDisabledKnownLanguagesList([]);
		selectLanguageToLearn(undefined);
		fireAnalyticsEvent("Dictionary creation", "Reset the language to learn");
	};

	return (
		<div id="new-dictionary-container" className="manage-dictionary-container">
			<LanguagesListDrawer
				listId="language-list-from"
				listTitle="I know:"
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
				title="I know:"
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
				title="I learn:"
				disabledItems={disabledLanguagesToLearnList}
				selectedItem={selectedLanguageToLearn}
				onItemSelect={handleLanguageToLearnSelection}
				reset={resetLanguageToLearn}
			/>

			<LanguagesListDrawer
				listId="language-list-to"
				listTitle="I learn:"
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
