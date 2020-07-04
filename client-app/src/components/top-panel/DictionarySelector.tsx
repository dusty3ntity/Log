import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Dropdown } from "antd";

import ArrowForwardIcon from "../icons/ArrowForwardIcon";
import DropdownIcon from "../icons/DropdownIcon";
import EditIcon from "../icons/EditIcon";
import PlusIcon from "../icons/PlusIcon";

const menu = (
	<Menu>
		<Menu.Item key="0" className="menu-item">
			<img className="flag lang-from" src="/images/flags/ukr.png" alt="Lang from" />
			<ArrowForwardIcon />
			<img className="flag lang-to" src="/images/flags/eng.png" alt="Lang to" />

			<div className="divider vertical menu-divider" />

			<span className="items-counter">273</span>
		</Menu.Item>

		<Menu.Item key="1" className="menu-item">
			<img className="flag lang-from" src="/images/flags/eng.png" alt="Lang to" />

			<ArrowForwardIcon />
			<img className="flag lang-to" src="/images/flags/rus.png" alt="Lang from" />

			<div className="divider vertical menu-divider" />

			<span className="items-counter">4k</span>
		</Menu.Item>

		<div id="menu-actions">
			<NavLink to="/new-dictionary" className="btn actions-btn new-btn primary">
				<PlusIcon />
			</NavLink>

			<NavLink to="/edit-dictionary" className="btn actions-btn edit-btn">
				<EditIcon />
			</NavLink>
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
				<img className="flag lang-from" src="/images/flags/rus.png" alt="Lang from" />
				<ArrowForwardIcon />
				<img className="flag lang-to" src="/images/flags/eng.png" alt="Lang to" />

				<DropdownIcon />
			</div>
		</Dropdown>
	);
};

export default DictionarySelector;
