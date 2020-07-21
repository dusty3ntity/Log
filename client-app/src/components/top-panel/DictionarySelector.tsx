import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../app/stores/rootStore";
import ArrowForwardIcon from "../icons/ArrowForwardIcon";
import DropdownIcon from "../icons/DropdownIcon";
import PlusIcon from "../icons/PlusIcon";
import SettingsIcon from "../icons/SettingsIcon";
import Divider from "../common/other/Divider";

const DictionarySelector = () => {
	const rootStore = useContext(RootStoreContext);
	const { activeDictionary, selectDictionary, dictionariesRegistry } = rootStore.dictionaryStore;

	const menu = (
		<Menu className="menu">
			{Array.from(dictionariesRegistry.values()).map((dictionary) => (
				<Menu.Item
					key={dictionary.id}
					className={`menu-item ${activeDictionary.id === dictionary.id ? "active" : ""}`}
					disabled={activeDictionary.id === dictionary.id}
					onClick={() => {
						selectDictionary(dictionary.id);
					}}
				>
					<img
						className="flag lang-from"
						src={`/images/flags/${dictionary.knownLanguage.isoCode}.png`}
						alt={dictionary.knownLanguage.isoCode}
					/>

					<ArrowForwardIcon />

					<img
						className="flag lang-to"
						src={`/images/flags/${dictionary.languageToLearn.isoCode}.png`}
						alt={dictionary.languageToLearn.isoCode}
					/>

					<Divider className="menu-divider" vertical />

					<span className="items-counter">{dictionary.wordsCount + dictionary.phrasesCount}</span>
				</Menu.Item>
			))}

			<div id="menu-actions">
				<NavLink exact to="/new-dictionary" className="btn actions-btn new-btn primary">
					<PlusIcon />
				</NavLink>

				<NavLink exact to="/dictionaries" className="btn actions-btn settings-btn">
					<SettingsIcon />
				</NavLink>
			</div>
		</Menu>
	);

	return (
		<Dropdown
			overlay={menu}
			trigger={["click"]}
			placement="bottomCenter"
			overlayClassName="dictionary-selector-dropdown"
		>
			<div className="btn dictionary-selector">
				<img
					className="flag lang-from"
					src={`/images/flags/${activeDictionary!.knownLanguage.isoCode}.png`}
					alt={activeDictionary!.knownLanguage.isoCode}
				/>

				<ArrowForwardIcon />

				<img
					className="flag lang-to"
					src={`/images/flags/${activeDictionary!.languageToLearn.isoCode}.png`}
					alt={activeDictionary!.languageToLearn.isoCode}
				/>

				<DropdownIcon />
			</div>
		</Dropdown>
	);
};

export default observer(DictionarySelector);
