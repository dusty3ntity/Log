import React from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "antd";

import ArrowForwardIcon from "../icons/ArrowForwardIcon";
import DropdownIcon from "../icons/DropdownIcon";
import EditIcon from "../icons/EditIcon";
import PlusIcon from "../icons/PlusIcon";

const menu = (
	<Menu>
		<Menu.Item key="0" className="menu-item">
			<img className="flag lang-from" src="/images/flags/ua.png" alt="Lang from" />
			<ArrowForwardIcon />
			<img className="flag lang-to" src="/images/flags/en.png" alt="Lang to" />

			<div className="divider vertical menu-divider" />

			<span className="items-counter">273</span>
		</Menu.Item>

		<Menu.Item key="1" className="menu-item">
			<img className="flag lang-from" src="/images/flags/en.png" alt="Lang to" />

			<ArrowForwardIcon />
			<img className="flag lang-to" src="/images/flags/ru.png" alt="Lang from" />

			<div className="divider vertical menu-divider" />

			<span className="items-counter">4k</span>
		</Menu.Item>

		<div id="menu-actions">
			<Link to="/dictionaries/new" className="btn actions-btn new-btn">
				<PlusIcon />
			</Link>

			<Link to="/dictionaries" className="btn actions-btn edit-btn">
				<EditIcon />
			</Link>
		</div>
	</Menu>
);

const DictionarySelector = () => {
	return (
		<Dropdown
			overlay={menu}
			trigger={["click"]}
			placement="bottomCenter"
			overlayClassName="dictionary-selector-dropdown"
		>
			<div className="dictionary-selector btn">
				<img className="flag lang-from" src="/images/flags/ru.png" alt="Lang from" />
				<ArrowForwardIcon />
				<img className="flag lang-to" src="/images/flags/en.png" alt="Lang to" />

				<DropdownIcon />
			</div>
		</Dropdown>
	);
};

export default DictionarySelector;
