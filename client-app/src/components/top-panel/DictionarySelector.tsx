import React, { useContext, useState } from "react";
import ArrowForwardIcon from "../icons/ArrowForwardIcon";
import { RootStoreContext } from "../../app/stores/rootStore";
import Tooltip from "../common/tooltips/Tooltip";
import DropdownIcon from "../icons/DropdownIcon";
import Divider from "../common/other/Divider";
import { NavLink } from "react-router-dom";
import PlusIcon from "../icons/PlusIcon";
import SettingsIcon from "../icons/SettingsIcon";
import { fireAnalyticsEvent } from "../../app/common/analytics/analytics";
import { observer } from "mobx-react-lite";

interface IProps {
    id?: string;
    classNames?: string[];
}

const DictionarySelector: React.FC<IProps> = ({
    id,
    classNames = [],
    ...props
}) => {
    const [isExpanded, setExpanded] = useState(false);
    const rootStore = useContext(RootStoreContext);
    const {
        activeDictionary,
        selectDictionary,
        dictionariesRegistry,
    } = rootStore.dictionaryStore;
    const handleDropdownIsExpanded = () => setExpanded(!isExpanded);

    const menu = isExpanded && (
        <ul
            className="dropdown-menu"
            tabIndex={0}
            onBlur={handleDropdownIsExpanded}
        >
            {Array.from(dictionariesRegistry.values()).map((dictionary) => (
                <li
                    className={`menu-item ${
                        activeDictionary.id === dictionary.id
                            ? "active dropdown-menu-item-disabled"
                            : ""
                    }`}
                    key={dictionary.id}
                    onClick={() => {
                        selectDictionary(dictionary.id);
                        fireAnalyticsEvent(
                            "Dictionaries",
                            "Switched a dictionary"
                        );
                        handleDropdownIsExpanded();
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

                    <Tooltip
                        text="Total items in dictionary."
                        position="top-end"
                    >
                        <span className="items-counter">
                            {dictionary.wordsCount + dictionary.phrasesCount}
                        </span>
                    </Tooltip>
                </li>
            ))}
            <div id="menu-actions">
                <NavLink
                    exact
                    to="/new-dictionary"
                    className="btn actions-btn new-btn primary"
                >
                    <PlusIcon />
                </NavLink>

                <NavLink
                    exact
                    to="/dictionaries"
                    className="btn actions-btn settings-btn"
                >
                    <SettingsIcon />
                </NavLink>
            </div>
        </ul>
    );

    return (
        <div
            id={id}
            className={
                "btn dictionary-selector dropdown-trigger " +
                (isExpanded ? "dropdown-open " : "") +
                classNames.join(" ")
            }
            onClick={handleDropdownIsExpanded}
            tour-step="1-9"
            {...props}
        >
            <Tooltip text="Language you know." position="bottom">
                <img
                    className="flag lang-from"
                    src={`/images/flags/${
                        activeDictionary!.knownLanguage.isoCode
                    }.png`}
                    alt={activeDictionary!.knownLanguage.isoCode}
                />
            </Tooltip>
            <ArrowForwardIcon />

            <Tooltip text="Language you learn." position="bottom">
                <img
                    className="flag lang-to"
                    src={`/images/flags/${
                        activeDictionary!.languageToLearn.isoCode
                    }.png`}
                    alt={activeDictionary!.languageToLearn.isoCode}
                />
            </Tooltip>

            <DropdownIcon />
            {menu}
        </div>
    );
};

export default observer(DictionarySelector);
