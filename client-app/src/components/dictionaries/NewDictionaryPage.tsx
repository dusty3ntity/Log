import React, { useState, useContext } from "react";

import Page from "../../app/layout/Page";
import LanguagesList from "./LanguagesList";
import { RootStoreContext } from "../../app/stores/rootStore";
import DictionaryForm from "./DictionaryForm";
import { IDictionary } from "../../app/models/dictionary";
import { ILanguage } from "../../app/models/languages";
import { languagesList } from "../../app/models/languages";
import Drawer from "../common/other/Drawer";

const NewDictionaryPage: React.FC = ({ ...props }) => {
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
		<Page pageTitle="New dictionary" id="new-dictionary-page" className="manage-dictionary-page" {...props}>
			<LanguagesList
				id="language-list-from"
				title="I know:"
				disabledItems={disabledKnownLanguagesList}
				selectedItem={selectedKnownLanguage}
				onItemSelect={handleKnownLanguageSelection}
				onReset={resetKnownLanguage}
			/>

			<div id="new-dictionary">
				<Drawer
					className="languages-list-drawer"
					placement="left"
					visible={isLeftDrawerVisible}
					onClose={() => setLeftDrawerVisible(false)}
				>
					<LanguagesList
						title="I know:"
						disabledItems={disabledKnownLanguagesList}
						selectedItem={selectedKnownLanguage}
						onItemSelect={handleKnownLanguageSelection}
						onReset={resetKnownLanguage}
						in-drawer="true"
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
					className="languages-list-drawer"
					visible={isRightDrawerVisible}
					onClose={() => setRightDrawerVisible(false)}
				>
					<LanguagesList
						title="I learn:"
						disabledItems={disabledLanguagesToLearnList}
						selectedItem={selectedLanguageToLearn}
						onItemSelect={handleLanguageToLearnSelection}
						onReset={resetLanguageToLearn}
						in-drawer="true"
					/>
				</Drawer>
			</div>

			<LanguagesList
				id="language-list-to"
				title="I learn:"
				disabledItems={disabledLanguagesToLearnList}
				selectedItem={selectedLanguageToLearn}
				onItemSelect={handleLanguageToLearnSelection}
				onReset={resetLanguageToLearn}
			/>
		</Page>
	);
};

export default NewDictionaryPage;
