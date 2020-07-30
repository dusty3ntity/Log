import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../app/stores/rootStore";
import ArrowForwardIcon from "../icons/ArrowForwardIcon";
import DropdownIcon from "../icons/DropdownIcon";
import PlusIcon from "../icons/PlusIcon";
import SettingsIcon from "../icons/SettingsIcon";
import Tooltip from "../common/tooltips/Tooltip";
import Divider from "../common/other/Divider";
import { fireAnalyticsEvent } from "../../app/common/analytics/analytics";

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
						fireAnalyticsEvent("Dictionaries", "Switched a dictionary");
					}}
				>
					<Tooltip text="Language you know." position="top">
						<img
							className="flag lang-from"
							src={`/images/flags/${dictionary.knownLanguage.isoCode}.png`}
							alt={dictionary.knownLanguage.isoCode}
						/>
					</Tooltip>

					<ArrowForwardIcon />

					<Tooltip text="Language you learn." position="top">
						<img
							className="flag lang-to"
							src={`/images/flags/${dictionary.languageToLearn.isoCode}.png`}
							alt={dictionary.languageToLearn.isoCode}
						/>
					</Tooltip>

					<Divider className="menu-divider" vertical />

					<Tooltip text="Total items in dictionary." position="top-end">
						<span className="items-counter">{dictionary.wordsCount + dictionary.phrasesCount}</span>
					</Tooltip>
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
				<Tooltip text="Language you know." position="bottom">
					<img
						className="flag lang-from"
						src={`/images/flags/${activeDictionary!.knownLanguage.isoCode}.png`}
						alt={activeDictionary!.knownLanguage.isoCode}
					/>
				</Tooltip>

				<ArrowForwardIcon />

				<Tooltip text="Language you learn." position="bottom">
					<img
						className="flag lang-to"
						src={`/images/flags/${activeDictionary!.languageToLearn.isoCode}.png`}
						alt={activeDictionary!.languageToLearn.isoCode}
					/>
				</Tooltip>

				<DropdownIcon />
			</div>
		</Dropdown>
	);
};

export default observer(DictionarySelector);
