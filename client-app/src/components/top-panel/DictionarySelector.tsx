import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../app/stores/rootStore";
import ArrowForwardIcon from "../icons/ArrowForwardIcon";
import DropdownIcon from "../icons/DropdownIcon";
import EditIcon from "../icons/EditIcon";
import PlusIcon from "../icons/PlusIcon";

const DictionarySelector = () => {
	const rootStore = useContext(RootStoreContext);
	const { activeDictionary, selectDictionary, dictionariesRegistry } = rootStore.dictionariesStore;

	const menu = (
		<Menu className="menu">
			{Array.from(dictionariesRegistry.values())
				.filter((d) => d.id !== activeDictionary!.id)
				.map((dictionary) => (
					<Menu.Item
						key={dictionary.id}
						className="menu-item"
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

						<div className="divider vertical menu-divider" />

						<span className="items-counter">{dictionary.wordsCount + dictionary.phrasesCount}</span>
					</Menu.Item>
				))}

			<div id="menu-actions">
				<NavLink exact to="/new-dictionary" className="btn actions-btn new-btn primary">
					<PlusIcon />
				</NavLink>

				<NavLink exact to="/dictionaries" className="btn actions-btn edit-btn">
					<EditIcon />
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
