import React from "react";
import { Menu, Dropdown, Divider, Button } from "antd";

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

			<Divider className="menu-divider" type="vertical" />

			<span className="items-counter">273</span>
		</Menu.Item>

		<Menu.Item key="1" className="menu-item">
			<img className="flag lang-from" src="/images/flags/en.png" alt="Lang to" />

			<ArrowForwardIcon />
			<img className="flag lang-to" src="/images/flags/ru.png" alt="Lang from" />

			<Divider className="menu-divider" type="vertical" />

			<span className="items-counter">4921</span>
		</Menu.Item>

		<div id="menu-actions">
			<Button id="new-btn" className="actions-btn" href="#">
				<PlusIcon />
			</Button>

			<Button id="edit-btn" className="actions-btn" href="#">
				<EditIcon />
			</Button>
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
			<div id="dictionary-selector">
				<img className="flag lang-from" src="/images/flags/ru.png" alt="Lang from" />
				<ArrowForwardIcon />
				<img className="flag lang-to" src="/images/flags/en.png" alt="Lang to" />

				<DropdownIcon />
			</div>
		</Dropdown>
	);
};

export default DictionarySelector;
