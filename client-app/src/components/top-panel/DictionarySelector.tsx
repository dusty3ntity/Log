import React, { useContext, useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

import { RootStoreContext } from "../../app/stores/rootStore";
import ArrowForwardIcon from "../icons/ArrowForwardIcon";
import Tooltip from "../common/tooltips/Tooltip";
import DropdownIcon from "../icons/DropdownIcon";
import Divider from "../common/other/Divider";
import PlusIcon from "../icons/PlusIcon";
import SettingsIcon from "../icons/SettingsIcon";
import { fireAnalyticsEvent } from "../../app/common/analytics/analytics";
import { combineClassNames } from "../../app/common/util/classNames";

interface IProps {
	id?: string;
	classNames?: string[];
}

const DictionarySelector: React.FC<IProps> = ({ id, classNames = [], ...props }) => {
	const rootStore = useContext(RootStoreContext);
	const { activeDictionary, selectDictionary, dictionariesRegistry } = rootStore.dictionaryStore;

	const [dropdownExpanded, setDropdownExpanded] = useState(false);
	const buttonRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	const handleExpanded = () => setDropdownExpanded(!dropdownExpanded);

	useEffect(() => {
		const handleClickOutside = (e: any) => {
			if (
				menuRef.current &&
				buttonRef.current &&
				!menuRef.current.contains(e.target) &&
				!buttonRef.current.contains(e.target)
			) {
				setDropdownExpanded(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const menu = (
		<div className="dropdown-menu" ref={menuRef}>
			{Array.from(dictionariesRegistry.values()).map((dictionary) => (
				<div
					className={combineClassNames("menu-item", { active: activeDictionary.id === dictionary.id })}
					key={dictionary.id}
					onClick={() => {
						selectDictionary(dictionary.id);
						handleExpanded();
						fireAnalyticsEvent("Dictionaries", "Switched a dictionary");
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
						<span className="items-counter">{dictionary.wordsCount + dictionary.phrasesCount}</span>
					</Tooltip>
				</div>
			))}

			<div className="menu-actions">
				<NavLink
					exact
					to="/new-dictionary"
					className="btn primary actions-btn new-btn"
					onClick={handleExpanded}
				>
					<PlusIcon />
				</NavLink>

				<NavLink exact to="/dictionaries" className="btn actions-btn settings-btn" onClick={handleExpanded}>
					<SettingsIcon />
				</NavLink>
			</div>
		</div>
	);

	return (
		<div
			id={id}
			className={combineClassNames("dropdown", classNames, {
				"dropdown-open": dropdownExpanded,
				"dropdown-closed": !dropdownExpanded,
			})}
			{...props}
		>
			<div className="dropdown-button btn" ref={buttonRef} onClick={handleExpanded}>
				<div className="button-content-wrapper">
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

					<DropdownIcon />
				</div>
			</div>

			{menu}
		</div>
	);
};

export default observer(DictionarySelector);
