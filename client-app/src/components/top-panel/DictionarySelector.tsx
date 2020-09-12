import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

import { RootStoreContext } from "../../app/stores/rootStore";
import Tooltip from "../common/tooltips/Tooltip";
import Divider from "../common/other/Divider";
import { combineClassNames } from "../../app/common/util/classNames";
import Dropdown from "../common/other/Dropdown";
import { shortenNumber } from "../../app/common/util/numbers";
import ArrowForwardIcon from "../common/icons/ArrowForwardIcon";
import PlusIcon from "../common/icons/PlusIcon";
import SettingsIcon from "../common/icons/SettingsIcon";

const DictionarySelector: React.FC = ({ ...props }) => {
	const rootStore = useContext(RootStoreContext);
	const { activeDictionary, selectDictionary, dictionariesRegistry } = rootStore.dictionaryStore;

	const [dropdownExpanded, setDropdownExpanded] = useState(false);

	const handleExpanded = (value?: boolean) => {
		if (value === undefined) {
			value = !dropdownExpanded;
		}
		setDropdownExpanded(value);
	};

	const buttonContent = (
		<div className="flags-wrapper">
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
		</div>
	);

	const menuContent = (
		<>
			{Array.from(dictionariesRegistry.values()).map((dictionary) => (
				<div
					className={combineClassNames("menu-item", { active: activeDictionary.id === dictionary.id })}
					key={dictionary.id}
					onClick={() => {
						selectDictionary(dictionary.id);
						handleExpanded();
					}}
				>
					<div className="flags-wrapper">
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
					</div>

					<Divider vertical />

					<Tooltip text="Total items in dictionary." position="top-end">
						<span className="items-counter">
							{shortenNumber(dictionary.wordsCount + dictionary.phrasesCount, 10000)}
						</span>
					</Tooltip>
				</div>
			))}

			<div className="menu-actions">
				<NavLink
					exact
					to="/new-dictionary"
					className="btn primary actions-btn new-btn"
					onClick={() => handleExpanded()}
				>
					<PlusIcon />
				</NavLink>

				<NavLink
					exact
					to="/dictionaries"
					className="btn actions-btn settings-btn"
					onClick={() => handleExpanded()}
				>
					<SettingsIcon />
				</NavLink>
			</div>
		</>
	);

	return (
		<Dropdown
			id="dictionary-selector"
			expanded={dropdownExpanded}
			onClick={handleExpanded}
			buttonContent={buttonContent}
			menuContent={menuContent}
			{...props}
		/>
	);
};

export default observer(DictionarySelector);
